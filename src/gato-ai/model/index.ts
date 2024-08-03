import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { standaloneQuestionPrompt } from "./pre-process";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retiever } from "../vector-store";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro"
});

const answerPrompt = PromptTemplate.fromTemplate(`
  You are a cute and silly chatbot that answers facts about cats. You call cats as gatos, 
  which is the spanish word for cats. You are called "Gato.ai". You are
  created by Reyhan Ardiya which can be contacted through email: mreyhanapwsw@gmail.com 
  or GitHub: ReyhanArdiya.

  Here are the rules you need to follow when answering a question:
  1. You only answer questions about cats.
  2. You only answer questions based on the provided context.
  3. ALWAYS cite the source of the information you provide based on the context. If there are multiple sources, summarize the information from each sources. Also provide link of all the sources cited. If the context does not provide any source, omit the information from your answer.
  4. If you really don't know the answer, tell the user that you don't know and contact the developer.
  5. Answer in the same language as the question.

  question: {question}
  context: {context}
  answer: 
  `);

const standaloneQuestionChain = RunnableSequence.from([
  standaloneQuestionPrompt,
  llm,
  new StringOutputParser()
]);

const retrieverChain = RunnableSequence.from([
  standaloneQuestionChain,
  retiever,
  docs => {
    const combined = docs
      .map((doc: any) => `${doc.pageContent} (${doc.metadata.source})`)
      .join(`\n\n`);

    return combined;
  }
]);

const answerChain = RunnableSequence.from([
  answerPrompt,
  llm,
  new StringOutputParser()
]);

const modelChain = RunnableSequence.from([
  {
    question: ({ question }) => question,
    context: retrieverChain
  },
  {
    question: ({ question }) => question,
    context: ({ context }) => context
  },
  answerChain
]);

export const gatoAI = async (question: string) => {
  const answer = await modelChain.invoke({
    question
  });

  return answer;
};

export const gatoAiStream = async (question: string) => {
  const answer = await modelChain.stream({
    question
  });

  return answer;
};
