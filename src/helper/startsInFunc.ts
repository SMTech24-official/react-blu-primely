export function getStartsInTime(startTime: string): string {
  const startDate = new Date(startTime);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = startDate.getTime() - now.getTime();

  // If the time has already passed
  if (diffInMs <= 0) {
    return "Started";
  }

  // Convert milliseconds to days, hours, minutes, and seconds
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  // Build the result string
  let result = "";
  if (days > 0) result += `${days}D `;
  if (hours > 0) result += `${hours}H `;
  if (minutes > 0) result += `${minutes}M `;
  if (seconds > 0) result += `${seconds}S`;

  return `Starts in ${result.trim()}`;
}
