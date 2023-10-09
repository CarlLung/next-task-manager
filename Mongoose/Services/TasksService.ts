import { Task as ITask, UpdateTaskPayload } from "../interface/task";
import { TaskModel } from "../models/taskSchema";

export class TaskService {
  constructor() {}

  async getTasks() {
    try {
      const tasks = await TaskModel.find().lean().exec();
      return tasks;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async deleteTask(req: string) {
    try {
      return await TaskModel.findById(req).deleteOne();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async updateTask(
    req: string,
    {
      content,
      assignedTime,
      priority,
      routine,
      areaOfFocus,
      alarm,
      label,
    }: UpdateTaskPayload
  ) {
    const result = await TaskModel.findByIdAndUpdate(
      req,
      {
        $set: {
          content: content,
          assignedTime: assignedTime,
          priority: priority,
          routine: routine,
          areaOfFocus: areaOfFocus,
          alarm: alarm,
          label: label,
        },
      },

      { new: true }
    );
    if (!result) {
      throw new Error("Error updating task");
    }
    return "task updated";
  }

  async createTask({
    _id,
    content,
    createdTime,
    assignedTime,
    priority,
    completed,
    routine,
    areaOfFocus,
    alarm,
    archived,
    label,
  }: ITask) {
    const result = await new TaskModel({
      _id,
      content,
      createdTime,
      assignedTime,
      priority,
      completed,
      routine,
      areaOfFocus,
      alarm,
      archived,
      label,
    }).save();
    if (!result) {
      throw new Error("Error creating task");
    }
    return "task added";
  }
}
