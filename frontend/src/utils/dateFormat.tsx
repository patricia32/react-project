export default function dateFormat(date: Date): string {
  date.setHours(date.getHours() - 2);
  const now = new Date();
  const diff: number = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just Now';
  else if (minutes < 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  else if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  else if (days === 1) return 'Yesterday';
  else if (days < 7) return `${days} days ago`;
  else {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
