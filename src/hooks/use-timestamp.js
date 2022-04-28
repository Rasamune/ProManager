export const useTimestamp = date => {
  const currentDate = new Date();
  const newDate = new Date(date);
  const timeBetween = Math.abs(newDate.getTime() - currentDate.getTime());
  const hoursDifference = Math.trunc(timeBetween / (60 * 60 * 1000));
  const minutesDifference = Math.trunc(timeBetween / (60 * 1000));

  const formattedDate = useDateFormat(newDate);

  if (hoursDifference < 24) {
    if (minutesDifference < 60) {
      if (minutesDifference < 2) {
        return `1 minute ago`;
      }
      return `${minutesDifference} minutes ago`;
    }
    if (hoursDifference < 2) {
      return `1 hour ago`;
    }
    return `${hoursDifference} hours ago`;
  }

  return formattedDate;
};

export const useDateFormat = date => {
  const newDate = new Date(date);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let dateString = `${
    months[newDate.getMonth()]
  } ${newDate.getDate()}, ${newDate.getFullYear()}`;

  return dateString;
};
