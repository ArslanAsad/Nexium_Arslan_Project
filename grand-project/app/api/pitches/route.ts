import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { connectToDatabase } from "@/lib/mongodb";
import Pitch from "@/models/Pitch";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    // check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // request body
    const body = await request.json();
    const { idea_description, tone } = body;
    if (!idea_description || !tone) {
      return NextResponse.json(
        { error: "idea_description and tone are required" },
        { status: 400 }
      );
    }

    // call the n8n webhook
    const webhookResponse = await fetch(
      "https://n8n-rfho.onrender.com/webhook/generate-pitch",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea_description,
          tone,
        }),
      }
    );
    if (!webhookResponse.ok) {
      throw new Error(`Webhook request failed: ${webhookResponse.status}`);
    }
    const generatedPitch = await webhookResponse.json();

    // connect to MongoDB and save pitch data
    await connectToDatabase();
    const pitchData = {
      userId: user.id,
      content: JSON.stringify({
        idea: generatedPitch.idea,
        tone: generatedPitch.tone,
        pitch: generatedPitch.pitch,
      }),
    };
    const savedPitch = await Pitch.create(pitchData);

    // return data
    return NextResponse.json(generatedPitch);
  } catch (error) {
    console.error("Error generating pitch:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // connect to MongoDB and fetch user's pitches
    await connectToDatabase();
    const pitches = await Pitch.find({ userId: user.id }).sort({
      createdAt: -1,
    });
    const parsedPitches = pitches.map((pitch) => ({
      _id: pitch._id,
      userId: pitch.userId,
      ...JSON.parse(pitch.content),
      createdAt: pitch.createdAt,
    }));
    return NextResponse.json({ pitches: parsedPitches });
  } catch (error) {
    console.error("Error fetching pitches:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
