import { scrapeGatosFacts } from "./gato-ai/scrape-gato-facts";
import { retiever, setupVectoreStore, vectorStore } from "./gato-ai/vector-store";

export async function register() {
  await setupVectoreStore();
}
