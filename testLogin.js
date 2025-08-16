import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./src/models/User.js"; // correct path
import bcrypt from "bcryptjs";

async function testLogin() {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ email: "raghu@gndsolutions.in" });
  if (!user) return console.log("User not found");

  const isMatch = await bcrypt.compare("yourPlainPasswordHere", user.password);
  console.log("Password match:", isMatch);

  await mongoose.disconnect();
}

testLogin();
