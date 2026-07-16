import express from "express";

import {
  sendMessage,
  getAllMessages,
  replyMessage,
  deleteMessage,
  getMyMessages,
} from "../controllers/contactController.js";

import authenticate from "../middlewares/authenticate.js";

const contactRouter = express.Router();

// CUSTOMER
contactRouter.post("/", sendMessage);
contactRouter.get("/my-messages", authenticate, getMyMessages);

// ADMIN
contactRouter.get("/", authenticate, getAllMessages);
contactRouter.put("/reply/:id", authenticate, replyMessage);
contactRouter.delete("/:id", authenticate, deleteMessage);

export default contactRouter;