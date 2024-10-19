import { Router } from "express";
import { asyncHandler } from "./AsyncHandler.js";
import {
  getSubscribedArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/ArticleController.js";
import { ArticleError } from "../classes/ArticleError.js";

const articleRouter = Router();

// Route pour mettre à jour un utilisateur par ID
articleRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const id = req.user.dataValues.id;
      const articles = await getSubscribedArticles(id);
      res.status(200).json(articles);
    } catch (error) {
      throw new ArticleError(400, error.message);
    }
  })
);

articleRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const articles = await getArticlesPublishedBy(id);
      res.status(200).json(articles);
    } catch (error) {
      throw new ArticleError(400, error.message);
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
      //   console.log(title);
      //   console.log(content);
      await createArticle({
        authorID,
        title,
        content,
      });
      res.status(201).json();
    } catch (error) {
      throw new ArticleError(400, error.message);
    }
  })
);

articleRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      await deleteArticle(id);
      res.status(204).end();
    } catch (error) {
      throw new ArticleError(400, error.message);
    }
  })
);

articleRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const { title, content } = req.body;
      const id = req.params.id;
      await updateArticle(id, title, content);
      res.status(200).json();
    } catch (error) {
      throw new ArticleError(400, error.message);
    }
  })
);

export default articleRouter;
