export default function getInterval(a: number, b: number, maxVal: number = 1440) {
  let interval;

  if (a <= b) {
    interval = b - a;
  } else {
    interval = (maxVal - a) + b;
  }

  return interval;
}
