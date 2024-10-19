import { Comment } from "../models/Comment.js";

export const postComment = async (articleID, userID, content) => {
    try {
        await Comment.create({ articleID, userID, content });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (id) => {
    try {
        await Comment.findByPk(id);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};