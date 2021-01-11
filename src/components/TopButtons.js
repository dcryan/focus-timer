import { Button, Grid } from '@material-ui/core'
import {useSettingsContext} from '../store';

export function TopButtons({setTime}) {
  const { pomodoroTime, shortBreakTime, longBreakTime } = useSettingsContext();
  return (
    <Grid container spacing={1} justify="center">
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          onClick={setTime(pomodoroTime * 60)}
        >
          Pomodoro
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          onClick={setTime(shortBreakTime * 60, true)}
        >
          Short Break
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          onClick={setTime(longBreakTime * 60, true)}
        >
          Long Break
        </Button>
      </Grid>
    </Grid>
  )
}
