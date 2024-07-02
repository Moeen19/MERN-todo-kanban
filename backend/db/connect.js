import mongoose from "mongoose";
import User from "./models/userSchema.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Increase the timeout as needed
      socketTimeoutMS: 45000, // Increase the socket timeout as needed
    });
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

async function run() {
  const user = await User.find();
  // console.log(user)
}

run();

export default connectDB;
