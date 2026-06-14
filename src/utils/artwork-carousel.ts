export function getAdjacentImageIndices(currentIndex: number, length: number) {
  if (length < 2) return { prev: null, next: null };
  return {
    prev: currentIndex === 0 ? length - 1 : currentIndex - 1,
    next: currentIndex === length - 1 ? 0 : currentIndex + 1,
  };
}
