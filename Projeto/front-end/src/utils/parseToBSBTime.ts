import { addMinutes } from "date-fns";

export default function parseToBSBTime(date: number) {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const offsetDiff = offset !== 180 ? Math.abs(offset - 180) : 0;

  return addMinutes(date, offsetDiff);
}
