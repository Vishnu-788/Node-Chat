// server.ts
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import chatRoutes from "../Routes/chatRoutes";
import authRoutes from "../Routes/authRoutes";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware to parse JSON
app.use(express.json());

// Basic logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Listening on Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
