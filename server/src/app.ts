import express, { Request, Response } from "express";
import cors from "cors";


const app = express();

// Middlewares

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (request: Request, res: Response) => {
  res.send("Server Running");
});


export default app;
