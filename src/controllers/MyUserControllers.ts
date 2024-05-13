import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User get successfully",
      user: currentUser.toObject(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong in getCurrent user",
    });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  // 1. Check if the user exists
  // 2. create the user if doesn't exist
  // 3. return the user object to the calling clinet

  try {
    const { auth0Id } = req.body;

    const existUser = await User.findOne({ auth0Id: auth0Id });

    if (existUser) {
      return res.status(400).json({
        message: " User already exists !!! ",
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser.toObject(),
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Error creating creatCurrentUser",
    });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: user.toObject(),
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Error while updating current user",
    });
  }
};

export default { createCurrentUser, updateCurrentUser, getCurrentUser };
