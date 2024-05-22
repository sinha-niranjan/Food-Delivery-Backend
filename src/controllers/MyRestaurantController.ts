import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({
        message: "You don't have a restaurant",
      });
    }

    res
      .status(200)
      .json({ message: "get restaurant successfully ", restaurant });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Something went wrong in getMyRestaurant",
    });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({
        message: "You already have a restaurant",
      });
    }

    // const image = req.file as Express.Multer.File;
    // const base64Image = Buffer.from(image.buffer).toString("base64");
    // const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // const uploadRespone = await cloudinary.v2.uploader.upload(dataURI);

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).json({
      message: "Restaurant is created successfully",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong in createMyRestaurant",
    });
  }
};

export const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({
        message: "You don't have a restaurant",
      });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date(); 

    if (req.file) {
      const prevImageUrl = restaurant.imageUrl;
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
      await cloudinary.v2.uploader.destroy(prevImageUrl);
    }

    await restaurant.save();
    res.status(200).json({
      message: "Restaurant is updated successfully",
      restaurant,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Something went wrong in updateMyRestaurant",
    });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file as Express.Multer.File;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadRespone = await cloudinary.v2.uploader.upload(dataURI);
  return uploadRespone.url;
};

export default { createMyRestaurant, getMyRestaurant, updateMyRestaurant };
