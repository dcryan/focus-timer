export function formatTime(s) {
  let seconds = Math.floor(s % 60);
  const minutes = Math.floor(s / 60);

  // seconds should always be 2 digits long
  if (seconds <= 9) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
