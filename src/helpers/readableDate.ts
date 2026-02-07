export default function readableDate(date: string) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day:   'numeric',
    year:  'numeric',
  }).format(new Date(`${date}T00:00:00`));
  return formattedDate;
}
