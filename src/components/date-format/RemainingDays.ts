import moment from "moment";
import React from "react";

const calculateRemainingDays = (deadline: string) => {
  const deadlineDate = moment(deadline);
  const currentDate = moment();
  const differenceDays = deadlineDate.diff(currentDate, "days");
  if (differenceDays < 0) {
    return 0;
  } else return differenceDays;
};

function formatDateAgo(posted: string) {
  const date = new Date(posted);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSec = diffInMs / 1000;
  const diffInMin = diffInSec / 60;
  const diffInHour = diffInMin / 60;
  const diffInDay = diffInHour / 24;
  const diffInWeek = diffInDay / 7;

  if (diffInMin < 1) {
    return "Just now";
  } else if (diffInMin < 60) {
    return `${Math.floor(diffInMin)} minutes ago`;
  } else if (diffInHour < 24) {
    return `${Math.floor(diffInHour)} hours ago`;
  } else if (diffInDay < 7) {
    return `${Math.floor(diffInDay)} days ago`;
  } else if (diffInWeek < 4) {
    return `${Math.floor(diffInWeek)} weeks ago`;
  } else {
    return date.toDateString(); // fallback to the default date format
  }
}

function formatDateYear(posted: string) {
  // Get the month name
  const monthNames = [
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
  const date = new Date(posted);
  const month = monthNames[date.getMonth()];

  // Get the day with suffix
  const day = date.getDate();
  let dayWithSuffix;
  if (day === 1 || day === 21 || day === 31) {
    dayWithSuffix = day + "st";
  } else if (day === 2 || day === 22) {
    dayWithSuffix = day + "nd";
  } else if (day === 3 || day === 23) {
    dayWithSuffix = day + "rd";
  } else {
    dayWithSuffix = day + "th";
  }

  // Get the year
  const year = date.getFullYear();

  // Concatenate the parts and return
  return `${month} ${dayWithSuffix}, ${year}`;
}

function calculateTimeLeft(deadline: string) {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  let difference = Math.abs(deadlineDate.getTime() - now.getTime()) / 1000;

  const days = Math.floor(difference / 86400);
  difference -= days * 86400;

  const hours = Math.floor(difference / 3600) % 24;
  difference -= hours * 3600;

  const minutes = Math.floor(difference / 60) % 60;
  difference -= minutes * 60;

  const seconds = Math.floor(difference % 60);

  return { days, hours, minutes, seconds };
}

export {
  calculateRemainingDays,
  formatDateAgo,
  formatDateYear,
  calculateTimeLeft,
};
