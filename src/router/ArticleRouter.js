import { Router } from "express";
import { asyncHandler } from "./AsyncHandler.js";
import {
  getArticles,
  getSubscribedArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/ArticleController.js";

const articleRouter = Router();

articleRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const userID = req.user.dataValues.id;
      const articles = await getArticles(userID);
      res.status(200).json(articles);
    } catch (e) {
      res.status(e.code ?? 500).json({ error: e.message });
    }
  })
);

articleRouter.get(
  "/subscribed",
  asyncHandler(async (req, res) => {
    try {
      const id = req.user.dataValues.id;
      const articles = await getSubscribedArticles(id);
      res.status(200).json(articles);
    } catch (e) {
      res.status(e.code ?? 500).json({ error: e.message });
    }
  })
);

articleRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const authorID = req.user.dataValues.id;
      const title = req.body.title;
      const content = req.body.content;
      await createArticle(
        authorID,
        title,
        content,
      );
      res.status(201).json();
    } catch (e) {
      res.status(e.code ?? 500).json({ error: e.message });
    }
  })
);

articleRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const userID = req.user.dataValues.id;
      const articleID = req.params.id;
      const { title, content } = req.body;
      const article = await updateArticle(userID, articleID, title, content);
      res.status(200).json(article);
    } catch (e) {
      res.status(e.code ?? 500).json({ error: e.message });
    }
  })
);

articleRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const userID = req.user.dataValues.id;
      const articleID = req.params.id;
      await deleteArticle(userID, articleID);
      res.status(204).end();
    } catch (e) {
      res.status(e.code ?? 500).json({ error: e.message });
    }
  })
);

export default articleRouter;
