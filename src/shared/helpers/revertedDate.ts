export default function revertedDate(date: string) {
  const formattedDate = new Intl.DateTimeFormat('en-CA').format(new Date(date));
  return formattedDate;
}