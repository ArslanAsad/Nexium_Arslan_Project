import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { connectToDatabase } from "@/lib/mongodb";
import Pitch from "@/models/Pitch";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // check if user is authenticated
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("Authentication error:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Pitch ID is required" },
        { status: 400 }
      );
    }

    // connect to MongoDB and delete the pitch
    await connectToDatabase();
    const deletedPitch = await Pitch.findOneAndDelete({
      _id: id,
      userId: user.id,
    });
    if (!deletedPitch) {
      return NextResponse.json(
        { error: "Pitch not found or unauthorized" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Pitch deleted successfully" });
  } catch (error) {
    console.error("Error deleting pitch:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
