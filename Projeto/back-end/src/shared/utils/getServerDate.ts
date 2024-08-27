import { subMinutes } from "date-fns";

export default function getServerDate(date?: Date): Date {
  const now = new Date();
  const offset = now.getTimezoneOffset();

  console.log(now, { offset });

  if (date && offset !== 0) {
    const parsedDate = subMinutes(date, offset);

    console.log('Old date: ', date);
    console.log('Parsed date: ', parsedDate);

    return parsedDate
  }

  return now;
}
