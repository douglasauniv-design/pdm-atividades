import { createContext, useContext, useState } from "react";
import { PropsWithChildren } from "react";

// Passo 1: Shared Props
type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Passo 2: createContext
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Passo 3: Provider
export default function ThemeContextProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const themeContext: ThemeContextProps = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
}

// Passo 4: Consumer Hook
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeContextProvider!");
  }

  return context;
}
