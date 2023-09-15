import { Socket } from "socket.io";
import { broadcastTasks } from "../services/task";

export const registerEvents = (socket: Socket) => {
  socket.on("tasks", () => {
    broadcastTasks().catch((error: Error) => {
      console.error("Error broadcasting tasks:", error.message);
    });
  });
};
