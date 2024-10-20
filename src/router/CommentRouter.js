import { Router } from "express";
import { asyncHandler } from "./AsyncHandler.js";
import { postComment, updateComment, deleteComment } from "../controllers/CommentController.js";

const commentRouter = Router();

commentRouter.post(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const userID = req.user.dataValues.id;
      const articleID = req.params.id;
      const { content } = req.body;
      await postComment(articleID, userID, content);
      res.status(201).json();
    } catch (e) {
      res.status(e.code ?? 500).json({ error: e.message });
    }
  })
);

commentRouter.put("/:id", asyncHandler(async (req, res) => {
  try {
    const userID = req.user.dataValues.id;
    const commentID = req.params.id;
    const { content } = req.body;
    const comment = await updateComment(userID, commentID, content);
    res.status(200).json(comment);
  } catch (e) {
    res.status(e.code ?? 500).json({ error: e.message });
  }
}));

commentRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const userID = req.user.dataValues.id;
      const commentID = req.params.id;
      await deleteComment(userID, commentID);
      res.status(204).end();
    } catch (e) {
      res.status(e.code ?? 500).json({ error: e.message });
    }
  })
);

export default commentRouter;
