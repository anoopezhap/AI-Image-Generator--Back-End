import express from "express";
import { generateImage } from "./../controllers/generateAiImageController.js";

const router = express.Router();

router.get("/", generateImage);

export default router;
