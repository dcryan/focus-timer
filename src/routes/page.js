import {useState, useEffect} from 'react';
import {Button, Grid, Paper, TextField, IconButton } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {ThemeSwitch, Header, Timer, TopButtons, SettingsDialog} from '../components';
import {useSettingsContext} from '../store';

import tap from '../sound/tap.wav';
import finishedWork from '../sound/finishedWork.wav';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ClearIcon from '@material-ui/icons/Clear';

import { formatTime } from '../utils';

const tapAudio = new Audio(tap);
const finishedWorkAudio = new Audio(finishedWork);

const useStyles = makeStyles(theme => ({
  page: {
    height: "100vh",
    maxWidth: 400,
    margin: "auto"
  },
  content: {
    height: "100%",
  },
  paper: {
    minWidth: 325,
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
}));

export function Page() {
  const {pomodoroTime} = useSettingsContext();
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerValue, setTimerValue] = useState(pomodoroTime * 60);
  const [isDirty, setIsDirty] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const [currentTask, setCurrentTask] = useState();

  if (isDirty) {
    let timerState;
    if (isPlaying) {
      if (isBreak) {
        timerState = 'Break';
      } else {
        timerState = 'Working';
      }
    } else {
      timerState = 'Paused';
    }
    document.title = `${formatTime(timerValue)} - ${timerState}`;
  } else {
    document.title = "FocusTimer.io";
  }

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (timerValue === 1) {
          finishedWorkAudio.play();

          setIsPlaying(false);
          setIsDirty(false);
        }

        setTimerValue(timerValue - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [setTimerValue, timerValue, isPlaying]);

  const setTime = (time, _isBreak) => () => {
    setTimerValue(time);
    setIsPlaying(false);
    setIsDirty(false);
    setIsBreak(_isBreak);
  };

  return (
    <div className={classes.page}>
      <Grid container direction="column" justify="space-between" alignItems="center" className={classes.content}>
        <Header />

        <Grid item>
          <Paper className={classes.paper}>
            <Grid container direction="column" alignContent="center" spacing={2}>

              <Grid item>
                <TopButtons setTime={setTime} />
              </Grid>


              <Grid item>
                <Timer timerValue={timerValue} />
              </Grid>

              <Grid container item justify="center">
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
                    }}>
                    {isPlaying? "pause" : "start"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <TextField label="Current Task"
            type="search"
            />
        </Grid>

        <Grid item>
          <ThemeSwitch />
        </Grid>
      </Grid>

      <SettingsDialog />
    </div>
  );
}
