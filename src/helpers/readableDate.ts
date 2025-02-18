export default function readableDate(date: string) {
  console.log("gets", date)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day:   'numeric',
    year:  'numeric',
  }).format(new Date(`${date}T00:00:00`));
  console.log("sends", formattedDate)
  return formattedDate;
}
