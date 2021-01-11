import { IconButton, Typography, Grid } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings';
import {useSettingsContext} from '../store';

const useStyles = makeStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
  }
}));

export function Header() {
  const classes = useStyles();
  const { setSettingsOpen } = useSettingsContext();
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.container}>
      <Grid item>
        <Typography style={{fontFamily: "'Fira Code', monospace"}}>
          FocusTimer.io
        </Typography>
      </Grid>

      <Grid item>
        <IconButton edge="end" onClick={() => setSettingsOpen(true)}><SettingsIcon /></IconButton>
      </Grid>

    </Grid>

  );
}
