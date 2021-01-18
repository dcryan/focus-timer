import { Button, Grid } from '@material-ui/core'
import {useSettingsContext} from '../store';

export function TopButtons({setPomodoroTime, setShortBreakTime, setLongBreakTime}) {
  const { pomodoroTime, shortBreakTime, longBreakTime } = useSettingsContext();
  return (
    <Grid container spacing={1} justify="center">
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          onClick={setPomodoroTime(pomodoroTime * 60)}
        >
          Pomodoro
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          onClick={setShortBreakTime(shortBreakTime * 60, true)}
        >
          Short Break
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          onClick={setLongBreakTime(longBreakTime * 60, true)}
        >
          Long Break
        </Button>
      </Grid>
    </Grid>
  )
}
