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
  weekday: number | "nil";
  note: string;
}
