export function formatTime(isoString: string): string {
  if (!isoString) return "";

  const date = new Date(isoString);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function getRandomColorId(): string {
  const COLORS = ["1", "3", "4", "6", "7", "9", "11"];
  
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex]!;
}