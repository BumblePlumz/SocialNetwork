import { Router } from "express";
import { asyncHandler } from "./AsyncHandler.js";
import { postComment, deleteComment } from "../controllers/CommentController.js";
import { CommentError } from "../classes/CommentError.js";

const commentRouter = Router();

commentRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { articleID, content } = req.body;
      const userID = req.user.dataValues.id;
      await postComment({ articleID, userID, content });
      res.status(201).json();
    } catch (err) {
      throw new CommentError(400, err.message);
    }
    res.status(200).json({ message: "GET /comments" });
  })
);

commentRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      await deleteComment(id);
      res.status(204).end();
    } catch (err) {
      throw new CommentError(400, err.message);
    }
  })
);

export default commentRouter;
