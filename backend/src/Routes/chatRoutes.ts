import { Router } from "express";
import { getChat, getAllChats } from "../Controllers/chatsController";

const router = Router();

//Gets the users chat
router.get("/", getAllChats);

//Gets a single chat info
router.get("/:id", getChat);

export default router;
