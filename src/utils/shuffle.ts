export function inPlaceFisherYatesShuffle<T>(arr: T[]): T[] {
  for (let i = 0; i < arr.length - 1; i++) {
    const j = Math.floor(i + (Math.random() * (arr.length - i)));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
