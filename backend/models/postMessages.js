import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  image: { type: String, required: true },
  date: {
    type: Date,
    default: new Date(),
  },
});

const PostMessages = mongoose.model("PostMessages", postSchema);

export default PostMessages;
