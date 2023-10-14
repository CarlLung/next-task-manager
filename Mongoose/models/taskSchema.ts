import mongoose from "mongoose";
import { Task } from "../interface/task";

const taskSchema = new mongoose.Schema<Task>({
  _id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdTime: {
    type: Date,
    required: true,
  },
  assignedTime: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  routine: {
    type: String,
    required: false,
  },
  areaOfFocus: {
    type: Boolean,
    required: true,
  },
  alarm: {
    type: Boolean,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  weekday: {
    type: String,
    required: false,
  },
});

const TaskModel = mongoose.model<Task>("task", taskSchema);

export { TaskModel };
