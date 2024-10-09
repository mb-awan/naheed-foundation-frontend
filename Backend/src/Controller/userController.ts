// userController.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    }
  } catch (error) {
    next(error);
  }
};

// for login

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      if (user.password === password) {
        res.status(200).json({
          success: true,
          message: "Login successful",
          data: user,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
