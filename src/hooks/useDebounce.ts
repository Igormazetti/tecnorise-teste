import { useState, useEffect } from "react";

type DebounceProps = {
  value: string | undefined;
  delay: number;
};

export const useDebounce = ({ value, delay }: DebounceProps) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};
