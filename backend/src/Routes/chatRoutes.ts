import { Router } from "express";
import { getChat, getAllChats } from "../Controllers/chatsController";
import requireAuth from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);
//Gets the users chat
router.get("/", getAllChats);

//Gets a single chat info
router.get("/:id", getChat);

export default router;
