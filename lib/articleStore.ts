import { initialArticles } from "./mockData";
import type { KmsArticle } from "./types";

const articles: KmsArticle[] = [...initialArticles];

export function listArticles() { return articles; }

export function addArticle(article: KmsArticle) {
  articles.unshift(article);
  return article;
}
