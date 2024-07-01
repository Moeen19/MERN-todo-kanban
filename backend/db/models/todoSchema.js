import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  user: String,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDone: Boolean,
});

export default mongoose.model("Todo", todoSchema);
