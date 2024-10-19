import { ArticleError } from "../classes/ArticleError.js";
import { Article } from "../models/Article.js";
import { Subscription } from "../models/Subscription.js";

export const getSubscribedArticles = async (userID) => {
  try {
    const subscribedTo = await Subscription.findAll({
      where: { ownerID: userID },
    });
    const articles = await Article.findAll({
      where: { authorID: subscribedTo },
    });
    return articles;
  } catch (error) {
    throw new ArticleError(500, error.message);
  }
};

export const getArticlesPublishedBy = async (id) => {
  try {
    const articles = await Article.findAll({
      where: { authorID: parseInt(id) },
    });
    return articles;
  } catch (error) {
    throw new ArticleError(500, error.message);
  }
};

export const createArticle = async (authorID, title, content) => {
  try {
    console.log("creating article");
    // console.log(authorID, title, content);
    console.log(title);
    console.log(content);
    console.log(authorID);
    await Article.create({
      authorID: authorID,
      title: title,
      content: content,
    });
    console.log("article created");
  } catch (error) {
    throw new ArticleError(500, error.message);
  }
};

export const updateArticle = async (id, title, content) => {
  try {
    await Article.update(
      {
        title: title,
        content: content,
      },
      {
        where: { id: id },
      }
    );
  } catch (error) {
    throw new ArticleError(500, error.message);
  }
};

export const deleteArticle = async (id) => {
  try {
    const article = await Article.findByPk(id);
  } catch (error) {
    throw new ArticleError(500, error.message);
  }
};
