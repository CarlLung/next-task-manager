export interface Task {
    _id: string
    content: string
    createdTime: Date
    assignedTime: Date
    priority: string
    completed: boolean
    routine: string
    areaOfFocus: boolean
    alarm: boolean
    archived: boolean
    label?: string
}

export interface UpdateTaskPayload {
    content: string
    assignedTime: Date
    priority: string
    routine: string
    areaOfFocus: boolean
    alarm: boolean
    archived: boolean
    label?: string
}
