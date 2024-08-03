import { Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const callGatoAI = async (q: string) => {
    const response = await fetch(`/api/gato-ai?question=${q}`);
    const data = await response.json();

    setAnswer(data.answer);
  };

  const [tokens, setTokens] = useState<string[]>([]);

  const callGatoAIStream = async (q: string) => {
    setTokens([]);

    const response = await fetch(`/api/gato-ai-stream?question=${q}`);
    const reader = response.body?.getReader();

    if (!reader) return;

    let done = false;

    while (!done) {
      const { value, done: d } = await reader.read();

      if (value) {
        const text = new TextDecoder().decode(value);
        setTokens(prev => [...prev, text]);
      }

      done = d;
    }
  };

  return (
    <>
      <Input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask a question about cats"
      />

      <Button onClick={() => callGatoAI(question)}>Ask</Button>
      <Button onClick={() => callGatoAIStream(question)}>Ask (stream)</Button>

      <Text>{answer}</Text>
      <Text>{tokens.join("")}</Text>
    </>
  );
}
