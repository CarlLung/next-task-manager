import express from "express";
import { TaskController } from "./Controllers/TasksController";
import { RegisterController } from "./Controllers/RegisterController";
// import { GoogleTaskController } from "./Controllers/googleTaskController";
import { requireLogin } from "./lib/guard";

export default function (args: {
  registerController: RegisterController;
  taskController: TaskController;
  //   googleTaskController: GoogleTaskController;
}) {
  let router = express.Router();

  router.get("/", args.taskController.getTasks);

  router.post("/", args.taskController.createTask);

  router.delete("/:_id/delete", args.taskController.deleteTask);

  router.put("/:_id/update", args.taskController.updateTask);

  router.get("/register", requireLogin, args.registerController.getUserProfile);

  // user route
  router.post("/register", args.registerController.createUser);

  router.post("/login", args.registerController.localLogin);

  router.post("/login", requireLogin, args.registerController.localLogin);

  router.get("/check", requireLogin, args.registerController.userValidation);

  //Google Tasks route
  //   router.post("/tasks", args.googleTaskController.insertTask);

  return router;
}
