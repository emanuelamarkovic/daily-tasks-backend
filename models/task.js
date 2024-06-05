import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  category: {
    type: String,
    required: true,
  },
  elapsedTime: { type: Number, default: 0 },
  dueDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = model("Task", taskSchema);

export default Task;
