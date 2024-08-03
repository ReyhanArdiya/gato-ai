import { gatoAI } from "./gato-ai/model";
import { setupVectoreStore } from "./gato-ai/vector-store";

export async function register() {
  await setupVectoreStore();
}
