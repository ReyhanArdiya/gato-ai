import { PromptTemplate } from "@langchain/core/prompts";

export const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  `
  Given a question, convert it to a standalone question. Convert the question to English if it is not in English.

  question: {question} 
  standalone question:
  `
);
