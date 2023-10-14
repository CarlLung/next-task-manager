export const formatDate = (date: Date, routine: string) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = weekdays[date.getDay()];
  if (routine === "nil") {
    return ` ${weekday} | ${hours}:${minutes} | ${day}-${month}-${year} `;
  } else if (routine === "daily") {
    return `Daily | ${hours}:${minutes}`;
  } else if (routine === "weekly") {
    return `Weekly on ${weekday} | ${hours}:${minutes}`;
  } else if (routine === "monthly") {
    return `Monthly on ${day} | ${hours}:${minutes}`;
  }
};

export const formatCardDate = (date: Date, routine: string) => {
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = weekdays[date.getDay()];
  const month = monthNames[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  if (routine === "nil") {
    return `${day}-${month} | ${hours}:${minutes}`;
  } else if (routine === "daily") {
    return `Daily | ${hours}:${minutes}`;
  } else if (routine === "weekly") {
    return `Weekly on ${weekday} | ${hours}:${minutes}`;
  } else if (routine === "monthly") {
    return `Monthly on day ${day} | ${hours}:${minutes}`;
  }
};
