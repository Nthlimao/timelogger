export const convertMsToTimeString = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);

  const hoursText = String(hours).padStart(2, "0");

  return `${hoursText}h`;
};
