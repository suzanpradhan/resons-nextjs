export const formatTime = (time: any) => {
  // const minutes = Math.floor(time / 60);
  // const seconds = Math.round(time % 60);
  // return `${minutes}:${seconds.toString().padStart(2, '0')}`;

  if (time < 0) {
    return '00:00';
  }

  var sec_num = parseInt(time, 10);
  var minutes: number | string = Math.floor(sec_num / 60);
  var seconds: number | string = sec_num - minutes * 60;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return +minutes + ':' + seconds;
};

export const subtractSeconds = (t1: number, t2: number) => {
  return (t1 * 100 - t2 * 100) / 100;
};

export function toHoursAndMinutes(totalSeconds: number) {
  const roundedSeconds = Math.round(totalSeconds);
  const totalMinutes = Math.floor(roundedSeconds / 60);

  const seconds = roundedSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
