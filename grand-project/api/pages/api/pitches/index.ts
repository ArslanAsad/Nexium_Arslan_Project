import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "@/api/lib/supabaseClient";
import { connectToDatabase } from "@/api/lib/mongodb";
import Pitch from "@/api/models/Pitch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  const { method } = req;
  if (method === "GET") {
    const { userId } = req.query as { userId: string };
    const pitches = await Pitch.find({ userId });
    return res.status(200).json({ pitches });
  } else if (method === "POST") {
    const { userId, content } = req.body;
    const pitch = await Pitch.create({ userId, content });
    return res.status(201).json({ pitch });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
