import { Request, Response } from "express";
import User from "../models/user";

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
      error: error?.message,
    });
  }
};

export default { createCurrentUser };
