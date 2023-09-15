import TaskModel from "../models/task";
import mongoose from "mongoose";
import { io } from "../server";
import { Task } from "../types/task";

export const broadcastTasks = async () => {
  try {
    const data = await TaskModel.find({ active: true });
    io.emit("tasks", { data: { tasks: data } });
  } catch (error) {
    console.error("Error broadcasting tasks:", error);
  }
};

export const createTask = async (data: { text: string }) => {
  try {
    const newTask: Task = new TaskModel({
      _id: new mongoose.Types.ObjectId().valueOf(),
      text: data.text,
      active: true,
    });
    await newTask.save();
    await broadcastTasks();
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const tasksList = async () => {
  try {
    return await TaskModel.find({ active: true });
  } catch (error) {
    console.error("Error listing tasks:", error);
    throw error;
  }
};

export const tasksDetail = async (id: string) => {
  try {
    return await TaskModel.findOne({ _id: id, active: true });
  } catch (error) {
    console.error("Error getting task details:", error);
    throw error;
  }
};

export const tasksRemove = async (id: string) => {
  try {
    await TaskModel.updateOne({ _id: id }, { active: false });
    await broadcastTasks();
  } catch (error) {
    console.error("Error removing task:", error);
  }
};

export const tasksUpdate = async (id: string, data: { text: string }) => {
  try {
    await TaskModel.updateOne({ _id: id }, { text: data.text });
    await broadcastTasks();
  } catch (error) {
    console.error("Error updating task:", error);
  }
};
