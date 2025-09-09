import express, { Request, Response } from "express";
import cors from "cors";
import { handleError } from "./libraries/errors/errorHandler";
import cookieParser from 'cookie-parser';

// Route imports

import { userRouter } from "./apps/users"
import { productRouter } from "./apps/products";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/api/uploads', express.static('uploads'));

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
app.use("/api/products", productRouter)

// Global error middleware
app.use(handleError);


export default app;
