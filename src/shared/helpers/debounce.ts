export function debounce<T extends unknown[]>(func: (...args: T) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
