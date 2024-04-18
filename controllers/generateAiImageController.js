import dotenv from "dotenv";
import OpenAI from "openai";
import { createError } from "../error.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    //console.log(prompt);

    if (prompt) {
      const response = await openai.images.generate({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const generatedImage = response.data[0].b64_json;

      return res.status(200).json({ photo: generatedImage });
    }

    if (!prompt) {
      return res.status(400).json({ message: "Please enter a promt" });
    }
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
