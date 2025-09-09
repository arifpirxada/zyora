import express, { Request, Response } from "express";
import cors from "cors";
import { handleError } from "./libraries/errors/errorHandler";
import cookieParser from 'cookie-parser';

// Route imports

import { userRouter } from "./apps/users"
import upload from "./libraries/multer";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (request: Request, res: Response) => {
  res.send("Server Running");
});

// Routers

app.use("/api/auth", userRouter);

// Global error middleware
app.use(handleError);


export default app;
