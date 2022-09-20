import { useEffect } from "react";

export const useKeyboardEvent = (
  keyboardKey: string,
  onChange: () => void,
  elementId: string,
  deps: any[] = []
) => {
  useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === keyboardKey) {
        onChange();
      }
      return;
    };

    const element = document.getElementById(elementId);

    if (element) {
      element.addEventListener("keypress", onKeypress);
    }

    return () => {
      if (element) {
        element.removeEventListener("keypress", onKeypress);
      }
    };
  }, deps);
};
