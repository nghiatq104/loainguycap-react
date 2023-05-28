import { useEffect, useState } from "react";

const useDebounce = (callback, delay) => {
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, [timerId]);

  const debouncedCallback = (...args) => {
    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimerId(newTimerId);
  };

  return debouncedCallback;
};
export default useDebounce;
