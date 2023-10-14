export interface Task {
  _id: string;
  content: string;
  createdTime: Date;
  assignedTime: Date;
  priority: string;
  completed: boolean;
  routine: string;
  areaOfFocus: boolean;
  alarm: boolean;
  note: string;
  weekday: number | "nil";
}

export interface UpdateTaskPayload {
  content: string;
  assignedTime: Date;
  priority: string;
  routine: string;
  areaOfFocus: boolean;
  alarm: boolean;
  note: string;
  weekday: number | "nil";
}
