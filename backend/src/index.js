import dotenv from "dotenv";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(clerkMiddleware());

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port" + PORT);
});
