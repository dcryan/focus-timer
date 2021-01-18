import {useState, useEffect, useCallback} from 'react';
import {Button, Grid, Paper, TextField } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { Header, Timer, TopButtons, SettingsDialog } from '../components';
import {useSettingsContext} from '../store';

import tap from '../sound/tap.wav';
import finishedWork from '../sound/finishedWork.wav';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RefreshIcon from '@material-ui/icons/Refresh';

import { formatTime } from '../utils';

const tapAudio = new Audio(tap);
const finishedWorkAudio = new Audio(finishedWork);

const useStyles = makeStyles(theme => ({
  page: {
    height: "100vh",
  },
  content: {
    maxWidth: 400,
    margin: "auto"
  },
  paper: {
    width: '100%',
    maxWidth: 500,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(8),
  },
  textField: {
    width: 300,
  }
}));

const mode = {
  POMODORO: 'POMODORO',
  SHORT_BREAK: 'SHORT_BREAK',
  LONG_BREAK: 'LONG_BREAK',
};

export function Page() {
  const {pomodoroTime, shortBreakTime, longBreakTime} = useSettingsContext();
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerValue, setTimerValue] = useState(pomodoroTime * 60);
  const [isDirty, setIsDirty] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode.POMODORO);

  const getTimeOfCurrentMode = useCallback(() => {
    switch(currentMode) {
      case mode.POMODORO:
        return pomodoroTime;
      case mode.SHORT_BREAK:
        return shortBreakTime;
      case mode.LONG_BREAK:
        return longBreakTime;
      default:
        throw new Error('invalid mode');
    }
  }, [currentMode, pomodoroTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    if (!isDirty) {
      setTimerValue(getTimeOfCurrentMode() * 60);
    }
  }, [isDirty, pomodoroTime, shortBreakTime, longBreakTime, currentMode, getTimeOfCurrentMode])

  if (isDirty) {
    let timerState;
    if (isPlaying) {
      switch(currentMode) {
        case mode.POMODORO:
          timerState = 'Working';
          break;
        case mode.SHORT_BREAK:
        case mode.LONG_BREAK:
          timerState = 'Break';
          break;
        default:
          throw new Error('invalid mode');
      }
    } else {
      timerState = 'Paused';
    }
    document.title = `${formatTime(timerValue)} - ${timerState}`;
  } else {
    document.title = "Focus Timer";
  }

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (timerValue === 1) {
          setIsPlaying(false);
          setIsFinished(true);

          finishedWorkAudio.play();
          new Notification('Pomodoro Finished', { body: 'Time for a break!' });
        }

        setTimerValue(timerValue - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [setTimerValue, timerValue, isPlaying]);

  const setTime = mode => time => () => {
    setTimerValue(time);
    setIsPlaying(false);
    setIsFinished(false);
    setIsDirty(false);
    setCurrentMode(mode)
  };

  const resetTime = () => {
    setIsFinished(false);
    setIsDirty(false);
    setIsPlaying(false);
    setTimerValue(getTimeOfCurrentMode() * 60);
  };

  return (
    <div className={classes.page}>

      <Header />

      <Grid container direction="column" alignItems="center" className={classes.content}>

        <Grid item>
          <Paper className={classes.paper}>
            <Grid container direction="column" alignContent="center" spacing={2}>

              <Grid item>
                <TopButtons
                  setPomodoroTime={setTime(mode.POMODORO)}
                  setShortBreakTime={setTime(mode.SHORT_BREAK)}
                  setLongBreakTime={setTime(mode.LONG_BREAK)}
                />
              </Grid>


              <Grid item>
                <Timer timerValue={timerValue} />
              </Grid>

              <Grid container item justify="center" spacing={1}>
                {isDirty && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<RefreshIcon />}
                      onClick={() => {
                        tapAudio.play();
                        resetTime();
                      }}>
                      reset
                    </Button>
                  </Grid>
                )}
                {!isFinished && (
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={isPlaying? <PauseIcon /> : <PlayIcon />}
                    onClick={() => {
                      tapAudio.play();
                      setIsDirty(true);
                      setIsPlaying(!isPlaying)

                      Notification.requestPermission()
                        .then(function(result) {
                          console.log(result);
                        });
                    }}>
                    {isPlaying? "pause" : "start"}
                  </Button>
                </Grid>
                )}
              </Grid>

            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <TextField label="Current Task" type="search" className={classes.textField} />
        </Grid>
      </Grid>

      <SettingsDialog />
    </div>
  );
}
