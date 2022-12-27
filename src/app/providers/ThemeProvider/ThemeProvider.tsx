import { useLocalStorage } from "shared/hooks/useLocalStorage";

import React, { FC, ReactNode } from "react";

import { ThemeContext, themes } from "./ThemeContext";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("appTheme", themes.light);

  const toggleTheme = () => {
    if (theme === themes.dark) {
      setTheme(themes.light);
    } else {
      setTheme(themes.dark);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
