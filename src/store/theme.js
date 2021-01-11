import { useContext, useState, useMemo, createContext } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";

export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);
export const ThemeContextProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });

  const initialThemeState =
    JSON.parse(localStorage.getItem("theme")) ||
    (prefersDarkMode ? "dark" : "light");

  const [theme, setTheme] = useState(initialThemeState);

  const memoizedTheme = useMemo(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    return createMuiTheme({
      palette: {
        type: theme,
      },
    });
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <ThemeProvider theme={memoizedTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
