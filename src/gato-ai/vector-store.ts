import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { scrapeGatosFacts } from "./scrape-gato-facts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const embeddings = new GoogleGenerativeAIEmbeddings();

export const vectorStore = new MemoryVectorStore(embeddings);
export const retiever = vectorStore.asRetriever();

export const setupVectoreStore = async () => {
  const docs = await scrapeGatosFacts();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50
  });

  const splitDocs = await splitter.splitDocuments(docs);

  await vectorStore.addDocuments(splitDocs);

  console.log("Vector store setup complete");
};
