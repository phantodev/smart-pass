export function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

const monthMap = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export function formatDateTicketCard(date: string) {
  const dueDate = new Date(date);
  const month = monthMap[dueDate.getMonth()];
  const day = dueDate.getDate();
  const year = dueDate.getFullYear();

  return [month, day, year];
}
