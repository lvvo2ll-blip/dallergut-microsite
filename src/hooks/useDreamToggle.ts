import { useState, useCallback } from 'react';

export function useDreamToggle(initialState: number[] = []) {
  const [activeBoxes, setActiveBoxes] = useState<number[]>(initialState);

  const toggleBox = useCallback((id: number) => {
    setActiveBoxes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const isBoxActive = useCallback((id: number) => {
    return activeBoxes.includes(id);
  }, [activeBoxes]);

  const clearBoxes = useCallback(() => {
    setActiveBoxes([]);
  }, []);

  return {
    activeBoxes,
    toggleBox,
    isBoxActive,
    clearBoxes,
  };
}
