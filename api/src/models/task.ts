import { Schema, model, Model } from "mongoose";
import { Task } from "../types/task";

const TaskSchema = new Schema<Task>(
  {
    _id: { type: String, required: true },
    text: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  { timestamps: true, collection: "tasks" },
);

const TaskModel = model<Task, Model<Task>>("Task", TaskSchema);

export default TaskModel;
