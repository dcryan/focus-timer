import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
} from '@material-ui/core';

import { ThemeSwitcher } from './ThemeSwitcher';

import { useSettingsContext } from '../store';


export const SettingsDialog = () => {
  const {
    settingsOpen,
    setSettingsOpen,


    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,

    resetDefaults,
  } = useSettingsContext();

  return (
    <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <ThemeSwitcher />
          </Grid>
          <Grid item>
            <TextField
              label="Pomodoro (mins)"
              type="number"
              inputProps={{ min: "1" }}
              value={pomodoroTime}
              onChange={e => setPomodoroTime(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Short Break (mins)"
              type="number"
              inputProps={{ min: "1" }}
              value={shortBreakTime}
              onChange={e => setShortBreakTime(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Long Break (mins)"
              type="number"
              inputProps={{ min: "1" }}
              value={longBreakTime}
              onChange={e => setLongBreakTime(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetDefaults}>reset</Button>
      </DialogActions>
    </Dialog>
  );
};


