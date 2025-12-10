export function hashFunction(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 1000;
  }
  return hash.toString().padStart(3, '0');
}
