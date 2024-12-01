// src/Routes/authRoutes.ts
import { Router } from "express";
import { signupHandler, loginHandler } from "../Controllers/authController";
import { checkEmail } from "../middleware/checkEmailExists";
import { upload } from "../middleware/multer";

const router = Router();

// uploads the picture and connects to the handler with req.file(meta data of picture)
router.post("/signup", checkEmail, upload.single("picture"), signupHandler);

// Login User
router.post("/login", loginHandler);

export default router;
