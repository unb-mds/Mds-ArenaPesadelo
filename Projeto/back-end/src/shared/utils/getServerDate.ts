import { subMinutes } from "date-fns";

export default function getServerDate(date?: Date): Date {
  const now = new Date();
  const offset = now.getTimezoneOffset();

  console.log(now, { offset });

  if (date) {
    const parsedDate = offset !== 0 ? subMinutes(date, offset) : date;

    console.log('Old date: ', date);
    console.log('Parsed date: ', parsedDate);

    return parsedDate
  }

  return now;
}
