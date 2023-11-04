import { useEffect, useState } from 'react';

export default function useStorage(key: string, type = 'sessionStorage') {
  const [value, setValue] = useState<string>();

  // Initial fetch from storage
  useEffect(() => {
    const storage = type === 'sessionStorage' ? sessionStorage : localStorage;
    setValue(
      storage.getItem(key) == null
        ? storage.getItem(key)?.toString()
        : undefined
    );
  }, [key, type]);

  // Persist to storage
  useEffect(() => {
    // first render, don't override/destroy existing item value
    if (value !== undefined) {
      const storage = type === 'sessionStorage' ? sessionStorage : localStorage;
      if (value) {
        storage.setItem(key, value);
      }
    }
  }, [key, value, type]);
  console.log(value);
  return [value, setValue];
}
