export function convertTimestamp(timestamp: number): string {
  const dateObject = new Date(timestamp);
  return dateObject.toLocaleString();
}
