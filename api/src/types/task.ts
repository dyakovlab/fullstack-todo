import { Document } from "mongoose";

export interface Task extends Document {
  _id: string;
  text: string;
  active: boolean;
}
