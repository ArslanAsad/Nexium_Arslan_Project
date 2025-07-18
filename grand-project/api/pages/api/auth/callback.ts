import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Supabase handles the magic link flow client-side.
  res.status(200).json({
    message: "Auth callback endpoint - handled by Supabase client SDK.",
  });
}
