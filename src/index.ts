import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to databse"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({
    message: "health ok !! ",
  });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant",restaurantRoute)

app.listen(process.env.PORT || 7000, () => {
  console.log("Server is running on port 7000");
});
