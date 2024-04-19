import Post from "../models/post.model.js";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (err) {
    next(
      createError(
        err.status,
        err?.response?.data?.error?.message || err?.message
      )
    );
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl?.secure_url,
    });

    return res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.log(err);
    next(
      createError(
        err.status,
        err?.response?.data?.error?.message || err?.message
      )
    );
  }
};
