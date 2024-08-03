import { gatoAI } from "@/gato-ai/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.query;

  const answer = await gatoAI(question as string);

  res.status(200).json({ answer });
}
