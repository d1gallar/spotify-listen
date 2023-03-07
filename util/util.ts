import moment from "moment";

export const paddingNum = (num: number) => String(num).padStart(2, "0");

export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function createDateInfo(date: Date) {
  return {
    local: date.toLocaleString(),
    ms: date.getTime(),
  };
}

export function getPastDay(date: Date) {
  const pastDay = new Date(date);
  pastDay.setDate(date.getDate() - 1);
  return pastDay;
}

export function getPastWeek(date: Date) {
  const pastWeek = new Date(date);
  pastWeek.setDate(date.getDate() - 7);
  return pastWeek;
}

export function getPastMonth(date: Date) {
  const pastMonth = new Date(date);
  pastMonth.setMonth(date.getMonth() - 1);
  return pastMonth;
}

export function getPastYear(date: Date) {
  const pastYear = new Date(date);
  pastYear.setFullYear(date.getFullYear() - 1);
  return pastYear;
}

export function sortByDate(dateArr: Array<Date>, dir?: "asc" | "desc") {
  return dateArr.sort((a: Date, b: Date) => {
    if (dir === "asc") {
      return a.getTime() - b.getTime();
    } else {
      return b.getTime() - a.getTime();
    }
  });
}

export function formatDuration(ms: number) {
  let seconds = ms / 1000;
  let secondString: string = Number(seconds / 3600).toString();
  const hours = parseInt(secondString);
  seconds = seconds % 3600;
  secondString = Number(seconds / 60).toString();
  const minutes = parseInt(secondString);
  seconds = seconds % 60;

  const roundedSeconds = Math.floor(+seconds);
  secondString = roundedSeconds.toString().padStart(2, "0");
  if (hours === 0) return minutes + ":" + secondString;
  return hours + ":" + minutes + ":" + roundedSeconds;
}

export function removeLeadingZeroes(array: number[]) {
  let i = 0;
  while (array[i] === 0) {
    array.shift();
    i++;
  }
  return array;
}

export function formatDurationToHourMinSec(ms: number) {
  const hour = Math.floor(ms / (1000 * 60 * 60));
  let remainder = ms % (1000 * 60 * 60);
  const min = Math.floor(remainder / (1000 * 60));
  remainder = remainder % (1000 * 60);
  const sec = Math.floor(remainder / 1000);
  const arr = [hour, min, sec];
  const strArr = [" hr ", " min ", " sec "];
  if (hour > 48) return null;
  const removeZeros = removeLeadingZeroes(arr);
  if (removeZeros.length === 0) return null;
  let i = removeZeros.length - 1;
  let resultArr = [];
  while (i >= 0) {
    resultArr.push(removeZeros[i] + strArr[i]);
    i--;
  }
  const result = resultArr.reverse().join().replace(/,/g, "");
  return result;
}

export function humanizeAddedAt(str: string) {
  const pastMonth = moment().subtract(1, "month");
  const comparedDate = moment(str);
  if (pastMonth.diff(comparedDate) >= 0) {
    const month = new Date(str).toLocaleString("default", { month: "short" });
    const day = new Date(str).getDate().toString();
    const year = new Date(str).getFullYear().toString();
    return month + " " + day + ", " + year;
  }
  return moment(str).fromNow();
}
