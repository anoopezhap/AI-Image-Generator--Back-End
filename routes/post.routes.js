import express from "express";
import { createPost, getAllPosts } from "../controllers/postcontroller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/createpost", createPost);

export default router;
