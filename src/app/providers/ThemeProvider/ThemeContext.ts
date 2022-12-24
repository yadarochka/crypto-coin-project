import React from "react";

export const themes = {
  light: "ligth",
  dark: "dark",
};

const initialState = {
  theme: themes.light,
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext(initialState);
