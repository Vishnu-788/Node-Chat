import { Request, Response, NextFunction } from "express";
import userModel from "../Models/userModel";

// Midddleware for checking if the email exists in db or not
export const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email } = req.body;

    const existingEmail: string = await userModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error", error });
  }
};
