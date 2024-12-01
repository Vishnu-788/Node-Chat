import { Request, Response } from "express";
import { Chat } from "../Interfaces/ChatInterFace";

const getAllChats = (req: Request, res: Response): void => {
  console.log("testing development");
};

const getChat = (req: Request, res: Response): void => {
  console.log("testing development");
};

export { getChat, getAllChats };
