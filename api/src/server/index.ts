import express from "express";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { registerEvents } from "../socket";
import { taskRouter } from "../router/task";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "../swagger";
import { errorHandler } from "../middleware/error.middleware";
import { notFoundHandler } from "../middleware/not-found.middleware";
import dotenv from "dotenv";
import { corsOrigin, swaggerPath, taskPath } from "./consts";
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(taskPath, taskRouter);
app.use(swaggerPath, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(errorHandler);
app.use(notFoundHandler);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: corsOrigin } });

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  registerEvents(socket);
});

export { io, app, server };
