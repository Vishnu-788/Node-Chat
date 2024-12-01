import multer from "multer";
import { v4 as uuidv4 } from "uuid"; // Import UUID

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueId = uuidv4(); // Generate a unique ID
    const newFilename = `${uniqueId}-${file.originalname}`;
    cb(null, newFilename); // Set the new filename
  },
});

export const upload = multer({ storage });
