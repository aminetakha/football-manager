export const debounce = <T>(cb: (...args: T[]) => void, millis = 500) => {
  let timeout: NodeJS.Timeout | undefined;
  return (...args: T[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      cb(...args);
    }, millis);
  };
};
