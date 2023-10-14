// import { BaseController } from "../base-controller";
// import { GoogleTaskService } from "../Services/GoogleTaskService";
// import { HttpException } from "../base-controller";

// export class GoogleTaskController extends BaseController {
//   constructor(public googleTaskService: GoogleTaskService) {
//     super();
//   }

//   insertTask = this.handleRequest(async () => {
//     return await this.googleTaskService.insertTask();
//   });

  //   deleteTask = this.handleRequest(async (req) => {
  //     const paramsId = req.params._id;
  //     return await this.tasksService.deleteTask(paramsId);
  //   });
  //   updateTask = this.handleRequest(async (req) => {
  //     const paramsId = req.params._id;
  //     const {
  //       content,
  //       assignedTime,
  //       priority,
  //       routine,
  //       areaOfFocus,
  //       alarm,
  //       note,
  //       weekday,
  //     }: UpdateTaskPayload = req.body;
  //     return await this.tasksService.updateTask(paramsId, {
  //       content,
  //       assignedTime,
  //       priority,
  //       routine,
  //       areaOfFocus,
  //       alarm,
  //       note,
  //       weekday,
  //     });
  //   });

  //   createTask = this.handleRequest(async (req) => {
  //     const {
  //       _id,
  //       content,
  //       createdTime,
  //       assignedTime,
  //       priority,
  //       completed,
  //       routine,
  //       areaOfFocus,
  //       alarm,
  //       note,
  //       weekday,
  //     }: Task = req.body;

  //     if (
  //       /* !content ||
  //             !assignedTime ||
  //             !priority ||
  //             !areaOfFocus ||
  //             !alarm ||
  //             !archived */
  //       false
  //     ) {
  //       throw new HttpException(400, "Task info are required");
  //     }

  //     return await this.tasksService.createTask({
  //       _id,
  //       content,
  //       createdTime,
  //       assignedTime,
  //       priority,
  //       completed,
  //       routine,
  //       areaOfFocus,
  //       alarm,
  //       note,
  //       weekday,
  //     });
  //   });
// }
