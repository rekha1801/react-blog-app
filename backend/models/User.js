import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
  username: { type: String, required: [true, "Please provide a username"] },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 5,
    //select: false,
  },
  photo: { type: String },
});

const UserMessages = mongoose.model("user", userSchema);

export default UserMessages;
