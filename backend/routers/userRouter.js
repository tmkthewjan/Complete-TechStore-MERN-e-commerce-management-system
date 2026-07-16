import express from "express";
import {
  createUser,
  loginUser,
  getMyProfile,
  getAllUsers,
  toggleUserBlock,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);

userRouter.get("/me", getMyProfile);
userRouter.get("/", getAllUsers);
userRouter.put("/:userId/toggle-block", toggleUserBlock);

export default userRouter;