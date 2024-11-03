import { Request, Response } from "express";

import userModel from "../Models/userModel";
import jwt from "jsonwebtoken";

const createToken = (_id: string): string => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3D" });
  return token;
};

// signup user
const signupHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const profileMeta = req.file;
  console.log(profileMeta);

  try {
    // Sign up the user
    const newUser = await userModel.signup(name, email, password, profileMeta);
    const token = createToken(newUser._id.toString());
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Login hanlder
const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //Login in the user
    const user = await userModel.login(email, password);
    const token = createToken(user._id.toString());
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signupHandler, loginHandler };
