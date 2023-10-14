import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());

dotenv.config();

app.use(express.json());

const mongoDB = process.env.DATABASE_URL || "";

mongoose.connect(mongoDB, {});

const db = mongoose.connection;

import { RegisterService } from "./Services/RegisterService";
import { TaskService } from "./Services/TasksService";
// import { GoogleTaskService } from "./Services/GoogleTaskService";

import { RegisterController } from "./Controllers/RegisterController";
import { TaskController } from "./Controllers/TasksController";
// import { GoogleTaskController } from "./Controllers/googleTaskController";

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const registerService = new RegisterService();
const registerController = new RegisterController(registerService);

// const googleTaskService = new GoogleTaskService();
// const googleTaskController = new GoogleTaskController(googleTaskService);

let router = routes({
  registerController,
  taskController,
  // googleTaskController,
});

app.use(router);

app.get("/", (req, res) => {
  res.send({ messaeg: "server connnected successfully" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Invalid request, typo on url or method?" });
});

const PORT = 8080;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});

// const tasks = require("@googleapis/tasks");

// const auth = new tasks.auth.GoogleAuth({
//   keyFilename: "next-task-manager-key.json",
//   // Scopes can be specified either as an array or as a single, space-delimited string.
//   scopes: ["https://www.googleapis.com/auth/tasks"],
// });
// const authClient = async () => {
//   await auth.getClient();
// };

// export const tasksClient = async () => {
//   await tasks.tasks({
//     version: "v1",
//     auth: authClient,
//   });
// };
