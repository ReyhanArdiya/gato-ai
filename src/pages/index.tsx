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

  return (
    <>
      <Input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask a question about cats"
      />

      <Button onClick={() => callGatoAI(question)}>Ask</Button>

      <Text>{answer}</Text>
    </>
  );
}
