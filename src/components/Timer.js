import { Typography } from '@material-ui/core'
import { formatTime } from '../utils';

export function Timer({timerValue}) {
  return <Typography variant="h1"
    style={{fontFamily: "'Fira Code', monospace"}}
    align="center"
  >
    {formatTime(timerValue)}
  </Typography>
}
