import { Router } from "express";
import { updateUser } from "../controllers/UserController.js";
import { UserError } from "../classes/UserError.js";
import { asyncHandler } from "./AsyncHandler.js";

const userRouter = Router();

// Route pour mettre à jour un utilisateur par ID
userRouter.put(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { firstname, lastname, email, password, photo } = req.body;
      const id = req.user.dataValues.id;
      const updatedFirstname = firstname ?? req.user.firstname;
      const updatedLastname = lastname ?? req.user.lastname;
      const updatedEmail = email ?? req.user.email;
      const updatedPassword = password ?? req.user.password;
      const updatedPhoto = photo ?? req.user.photo;
      await updateUser(
        id,
        updatedFirstname,
        updatedLastname,
        updatedEmail,
        updatedPassword,
        updatedPhoto
      );
      res.status(200).json();
    } catch (error) {
      throw new UserError(400, error.message);
    }
  })
);

export default userRouter;
