import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // FORCE "dark" as default if nothing is saved
    return localStorage.getItem("zinari_theme") || "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove both to reset
    root.classList.remove("light", "dark");

    // Add the current theme
    root.classList.add(theme);

    // Tell the browser the color scheme
    root.style.colorScheme = theme;

    localStorage.setItem("zinari_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
