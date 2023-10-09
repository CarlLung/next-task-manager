import { BaseController } from '../base-controller'
import { TaskService } from '../Services/TasksService'
import { HttpException } from '../base-controller'
import { Task, UpdateTaskPayload } from '../interface/task'

export class TaskController extends BaseController {
    constructor(public tasksService: TaskService) {
        super()
    }

    getTasks = this.handleRequest(async () => {
        return await this.tasksService.getTasks()
    })

    deleteTask = this.handleRequest(async (req) => {
        const paramsId = req.params._id
        return await this.tasksService.deleteTask(paramsId)
    })
    updateTask = this.handleRequest(async (req) => {
        const paramsId = req.params._id
        const {
            content,
            assignedTime,
            priority,
            routine,
            areaOfFocus,
            alarm,
            archived,
            label,
        }: UpdateTaskPayload = req.body
        return await this.tasksService.updateTask(paramsId, {
            content,
            assignedTime,
            priority,
            routine,
            areaOfFocus,
            alarm,
            archived,
            label,
        })
    })

    createTask = this.handleRequest(async (req) => {
        const {
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
        }: Task = req.body

        if (
            /* !content ||
            !assignedTime ||
            !priority ||
            !areaOfFocus ||
            !alarm ||
            !archived */
            false
        ) {
            throw new HttpException(400, 'Task info are required')
        }

        return await this.tasksService.createTask({
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
        })
    })
}
