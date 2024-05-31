export const format = (inputDate) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateObj = new Date(inputDate);
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const month = months[monthIndex];
  const year = dateObj.getFullYear().toString().slice(-2);
  const hours = ("0" + dateObj.getHours()).slice(-2);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);

  const daySuffix = getDaySuffix(day);
  return { day, daySuffix, month, year, hours, minutes };
};

export const formatDateTime = (dateObj) => {
  const { day, daySuffix, month, year, hours, minutes } = format(dateObj);
  const formattedDate = `${day}${daySuffix} ${month} ${year} ${hours}:${minutes}`;
  return formattedDate;
};

export const formatDate = (dateObj) => {
  const { day, daySuffix, month } = format(dateObj);

  const formattedDate = `${day}${daySuffix} ${month} `;
  return formattedDate;
};

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
