import mongoose from "mongoose";
import User from "./models/userSchema.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost/todo");
    console.log(conn.connection.host)
  } catch (error) {
    console.log(error);
  }
};

async function run() {
    const user = await User.find()
    // console.log(user)
}

run();

export default connectDB;