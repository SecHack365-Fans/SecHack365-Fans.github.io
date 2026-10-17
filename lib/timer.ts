export type ClockState = {
  now: Date;
  eventYear: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
};

export const getDeadline = (now: Date) => {
  const year = now.getMonth() >= 1 ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, 0, 31, 23, 59, 59, 999);
};

export const getClockState = (now: Date): ClockState => {
  const deadline = getDeadline(now);
  const remainingCentiseconds = Math.max(
    0,
    Math.floor((deadline.getTime() - now.getTime()) / 10),
  );
  const centisecondsPerDay = 24 * 60 * 60 * 100;
  const centisecondsPerHour = 60 * 60 * 100;
  const centisecondsPerMinute = 60 * 100;

  return {
    now,
    eventYear: deadline.getFullYear() - 2001,
    days: Math.floor(remainingCentiseconds / centisecondsPerDay),
    hours: Math.floor(
      (remainingCentiseconds % centisecondsPerDay) / centisecondsPerHour,
    ),
    minutes: Math.floor(
      (remainingCentiseconds % centisecondsPerHour) / centisecondsPerMinute,
    ),
    seconds: Math.floor((remainingCentiseconds % centisecondsPerMinute) / 100),
    centiseconds: remainingCentiseconds % 100,
  };
};

export const formatCountdownPart = (value: number) =>
  String(value).padStart(2, "0");
