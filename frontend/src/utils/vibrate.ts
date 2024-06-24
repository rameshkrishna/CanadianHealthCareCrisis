export const vibrate = (pattern: Iterable<number>) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
