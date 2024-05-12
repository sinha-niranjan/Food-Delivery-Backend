import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to databse"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({
    message: "health ok !! ",
  });
});

// /api/my/user

app.use("/api/my/user", myUserRoute);

app.listen(process.env.PORT || 7000, () => {
  console.log("Server is running on port 7000");
});
