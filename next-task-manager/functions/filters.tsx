import { Task } from "../interface/task";

const storedTime = (date: Date) => new Date(date).getTime();
const storedMonthDay = (date: Date) => new Date(date).getDate();
const currentDatetime = new Date();

const formatDateToDDMMYY = (date: Date) => {
  const day = String(new Date(date).getDate()).padStart(2, "0");
  const month = String(new Date(date).getMonth() + 1).padStart(2, "0");
  const year = String(new Date(date).getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

const isToday = (date: Date) => {
  const today = formatDateToDDMMYY(currentDatetime);
  return formatDateToDDMMYY(date) === today;
};

const isTomorrow = (date: Date) => {
  const tomorrow = new Date(currentDatetime.getTime() + 24 * 60 * 60 * 1000);
  return formatDateToDDMMYY(date) === formatDateToDDMMYY(tomorrow);
};

const isThisWeek = (date: Date) => {
  const currentDatetime = new Date();
  const currentDayOfWeek = currentDatetime.getDay();
  let startOfWeek: Date;

  if (currentDayOfWeek !== 0) {
    let d = new Date(
      currentDatetime.getTime() - (currentDayOfWeek - 1) * 24 * 60 * 60 * 1000
    );
    startOfWeek = new Date(d.setHours(0, 0, 0, 0));
  } else {
    let d = new Date(currentDatetime.getTime() - 6 * 24 * 60 * 60 * 1000);
    startOfWeek = new Date(d.setHours(0, 0, 0, 0));
  }

  let endOfWeek = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);

  endOfWeek = new Date(endOfWeek.setHours(0, 0, 0, 0));
  return (
    storedTime(date) >= startOfWeek.getTime() &&
    storedTime(date) <= endOfWeek.getTime()
  );
};

const isWeeklyRoutine = (day: number | "nil") => {
  const currentDatetime = new Date();
  const currentDayOfMonth = currentDatetime.getDay();
  if (day === "nil") {
    return false;
  }
  return day === currentDayOfMonth;
};

const isWeeklyRoutineTmr = (day: number | "nil") => {
  const currentDatetime = new Date();
  const currentDayOfWeek = currentDatetime.getDay();

  if (day === 0 && currentDayOfWeek === 6) {
    return true;
  } else if (day === "nil") {
    return false;
  } else if (day !== 0) {
    return day - 1 === currentDayOfWeek;
  }
};

const isMonthlylyRoutine = (date: Date) => {
  const currentDatetime = new Date();
  const currentDayOfMonth = currentDatetime.getDate();
  const lastDayOfCurrentMonth = new Date(
    currentDatetime.getFullYear(),
    currentDatetime.getMonth() + 1,
    0
  ).getDate();
  if (currentDayOfMonth === lastDayOfCurrentMonth) {
    return (
      storedMonthDay(date) ===
      new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    );
  }

  return storedMonthDay(date) === currentDayOfMonth;
};

const isMonthlylyRoutineTmr = (date: Date) => {
  const currentDatetime = new Date();
  const currentDayOfMonth = currentDatetime.getDate();
  const tomorrowDayOfMonth = currentDayOfMonth + 1;
  if (
    tomorrowDayOfMonth >
    new Date(
      currentDatetime.getFullYear(),
      currentDatetime.getMonth() + 1,
      0
    ).getDate()
  ) {
    return storedMonthDay(date) === 1;
  }
  return storedMonthDay(date) === tomorrowDayOfMonth;
};

/* const isNextWeek = (date) => {
  const currentDayOfWeek = currentDatetime.getDay();
  const startOfWeek = new Date(
    currentDatetime.getTime() + (8 - currentDayOfWeek) * 24 * 60 * 60 * 1000
  ).getDate();
  const endOfWeek = new Date(
    currentDatetime.getTime() + (15 - currentDayOfWeek) * 24 * 60 * 60 * 1000
  ).getDate();
  return storedDate(date) >= startOfWeek && storedDate(date) <= endOfWeek;
}; */

const not_priority4 = (priority: string) => priority !== "4th";
const firstPriority = (priority: string) => priority === "1st";

const filterMap = {
  "All Tasks": (task: Task) => !task.completed,
  Today: (task: Task) => isToday(task.assignedTime) && !task.completed,
  "Today's Objectives": (task: Task) =>
    (isToday(task.assignedTime) ||
      task.routine === "daily" ||
      isWeeklyRoutine(task.weekday!) ||
      isMonthlylyRoutine(task.assignedTime)) &&
    firstPriority(task.priority) &&
    !task.completed,
  "Today's Focus": (task: Task) =>
    (isToday(task.assignedTime) ||
      isWeeklyRoutine(task.weekday!) ||
      isMonthlylyRoutineTmr(task.assignedTime)) &&
    not_priority4(task.priority) &&
    !task.completed,
  "Tomorrow's Focus": (task: Task) =>
    (isTomorrow(task.assignedTime) ||
      isWeeklyRoutineTmr(task.weekday!) ||
      isMonthlylyRoutineTmr(task.assignedTime)) &&
    not_priority4(task.priority) &&
    !task.completed,
  "This Week's Focus": (task: Task) =>
    isThisWeek(task.assignedTime) &&
    not_priority4(task.priority) &&
    !task.completed,
  "Recurring Focus Areas": (task: Task) =>
    isThisWeek(task.assignedTime) &&
    not_priority4(task.priority) &&
    !task.routine &&
    !task.completed,
  Routines: (task: Task) => task.routine !== "nil",
  Archived: (task: Task) => task.completed === true,
};

const filterName = Object.keys(filterMap) as (keyof typeof filterMap)[];

/* export const WeeklyRoutineFilter = (allTasks) =>
  allTasks.filter((task: Task) => task.routine === "weekly");

export const MonthlyRoutinesFilter = (allTasks) =>
  allTasks.filter((task: Task) => task.routine === "monthly"); */

/* export const nextWeekFilter = () => {};
export const thisMonthFilter = () => {};
export const nextMonthFilter = () => {};
export const longTermFilter = () => {}; */

export { filterMap, filterName };
