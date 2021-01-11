import { useThemeContext } from "../store";
import { Switch, Grid } from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <Grid container justify="center" alignItems="center">
      <Brightness7Icon />
      <Grid item>
        <Switch
          color="primary"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          name="theme"
          inputProps={{ "aria-label": "theme" }}
        />
      </Grid>
      <Brightness3Icon />
    </Grid>
  );
};
