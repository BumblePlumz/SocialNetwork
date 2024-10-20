import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import dotenv from "dotenv";
import { sequelize } from "./src/data/index.js";
import { setupRelations } from "./src/models/Relation.js";
import { errorMiddleware } from "./src/middlewares/error.js";
import { auth } from "./src/middlewares/auth.js";
import authRouter from "./src/router/AuthRouter.js";
import userRouter from "./src/router/UserRouter.js";
import articleRouter from "./src/router/ArticleRouter.js";
import commentRouter from "./src/router/CommentRouter.js";
import subscriptionRouter from "./src/router/SubscriptionRouter.js";

// Configurations
setupRelations();
dotenv.config();

await sequelize.sync({ force: false });
const app = express();
const port = 3000;

// Middleware
app.use(errorMiddleware);
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", auth, userRouter);
app.use("/api/article", auth, articleRouter);
app.use("/api/comment", auth, commentRouter);
app.use("/api/subscribe", auth, subscriptionRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
