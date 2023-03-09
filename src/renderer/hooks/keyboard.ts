import { useEffect, useCallback, useState } from 'react';

export const useKeyboard = (
  keys: string[],
  onTrigger?: () => void,
  onRelease?: () => void
): boolean => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      const newPressedKeys = new Set(pressedKeys).add(event.key);
      if (!isTriggered && keys.every((key) => newPressedKeys.has(key))) {
        onTrigger?.();
        setIsTriggered(true);
      }
      setPressedKeys(newPressedKeys);
    },
    [pressedKeys, isTriggered, keys, onTrigger]
  );

  const keyUpHandler = useCallback(
    (event: KeyboardEvent) => {
      const newPressedKeys = new Set(pressedKeys);
      newPressedKeys.delete(event.key);
      if (isTriggered && keys.some((key) => !newPressedKeys.has(key))) {
        onRelease?.();
        setIsTriggered(false);
      }
      setPressedKeys(newPressedKeys);
    },
    [pressedKeys, isTriggered, keys, onRelease]
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [keyDownHandler, keyUpHandler]);

  return isTriggered;
};
