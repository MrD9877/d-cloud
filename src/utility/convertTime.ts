const monthsString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getDate(string: number) {
  const now = new Date(string);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  // Format as hh:mm AM/PM
  const formattedTime = `${date} ${monthsString[month]} ${year}`;
  return formattedTime;
}
