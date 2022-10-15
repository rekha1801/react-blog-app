import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postRouter from "./routes/postRoute.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/posts", postRouter);
const port = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port : ${port}`);
    });
  })
  .catch((err) => {
    console.log(`${err.message} - did not connect`);
  });
