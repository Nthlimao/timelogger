export const convertMsToTimeString = (milliseconds: number = 0) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);

  const hoursText = String(hours).padStart(2, "0");

  return `${hoursText}h`;
};

export const convertMsToMinutesString = (milliseconds: number = 0) => {
  const minutes = Math.floor(milliseconds / 60000);

  const minutesString = String(minutes).padStart(2, "0");

  return `${minutesString}mins`;
};

export const convertMsToHours = (milliseconds: number = 0): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);

  return String(hours).padStart(2, "0");
};

export const convertMsToMinutes = (milliseconds: number = 0) => {
  const minutes = Math.floor(milliseconds / 60000);

  return String(minutes).padStart(2, "0");
};

export const convertHoursToMs = (hours: number): string => {
  const totalSeconds = Math.floor(hours * 3600);
  const milliseconds = Math.floor(totalSeconds * 1000);

  return milliseconds.toString();
};

export const convertMinutesToMs = (minutes: number): string => {
  const milliseconds = Math.floor(minutes * 60000);

  return milliseconds.toString();
};
