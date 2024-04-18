import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";

import postRouter from "./routes/post.routes.js";
import generateImageRouter from "./routes/generateImage.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/post", postRouter);
app.use("/api/generateImage", generateImageRouter);

//error handling

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Happened";

  return res.status(500).json({ success: false, status, message });
});

//welcome message

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello developers" });
});

//function to connect with MongoDB

const uri = process.env.MONGODB_URI;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await mongoose.disconnect();
    console.log("Mongo DB Connected");
  }
}
run().catch(console.dir);

//starting server
const startServer = async () => {
  try {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (err) {
    console.log(error);
  }
};

startServer();
