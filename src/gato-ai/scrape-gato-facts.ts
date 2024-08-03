import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { AsyncCaller } from "@langchain/core/utils/async_caller";
import { Document } from "langchain/document";

const urls = [
  "https://cvillecatcare.com/veterinary-topics/101-amazing-cat-facts-fun-trivia-about-your-feline-friend/",
  "https://en.wikipedia.org/wiki/List_of_cat_breeds",
  "https://www.litter-robot.com/blog/breeds-of-cats/",
  "https://www.azpetvet.com/the-12-days-of-catmas-cat-breed-fun-facts/",
  "https://www.purina.co.uk/find-a-pet/articles/cat-types/fur-type/black-cat-breeds#:~:text=It's%20the%20Bombay%20cat%2C%20a,%22%20%2D%20what's%20not%20to%20like%3F",
  "https://www.thedodo.com/dodowell/cats-love-people-who-hate-them-study-finds",
  "https://www.telegraph.co.uk/news/2022/08/06/why-cats-love-people-who-hate/"
];

export const scrapeGatosFacts = async () => {
  const docs: Document[] = [];

  for (const url of urls) {
    const loader = new CheerioWebBaseLoader(url);

    const doc = await loader.load();

    docs.push(doc[0]);
  }

  return docs;
};
