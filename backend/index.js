import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";

import authenticate from "./middlewares/authenticate.js";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import contactRouter from "./routers/contactRouter.js";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

const app = express();

app.use(cors());

app.use(express.json());

app.use(authenticate);

app.get("/", (req, res) => {
  res.json({
    message: "TechStore Backend Running",
  });
});

// ======================
// Routes
// ======================

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.use("/api/contact", contactRouter);

// ======================
// 404
// ======================

app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});