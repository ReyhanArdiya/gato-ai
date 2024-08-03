import { gatoAiStream } from "@/gato-ai/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.query;

  const answerStream = await gatoAiStream(question as string);

  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Transfer-Encoding": "chunked"
  });

  let token = "";

  for await (const chunk of answerStream) {
    token = `${token} ${chunk}`;
    res.write(chunk);
  }

  res.end();
}
