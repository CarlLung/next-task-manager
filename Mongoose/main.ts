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

import { RegisterController } from "./Controllers/RegisterController";
import { TaskController } from "./Controllers/TasksController";

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const registerService = new RegisterService();
const registerController = new RegisterController(registerService);

let router = routes({
  registerController,
  taskController,
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
