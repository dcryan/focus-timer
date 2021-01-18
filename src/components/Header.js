import { IconButton, Typography, Grid } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings';
import {useSettingsContext} from '../store';

const useStyles = makeStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    width: '100%',
    maxWidth: 900,
    margin: 'auto',
    marginBottom: theme.spacing(3),
  },
  typography: {
    fontFamily: "'Fira Code', monospace",
    marginLeft: theme.spacing(2),
  }
}));

export function Header() {
  const classes = useStyles();
  const { setSettingsOpen } = useSettingsContext();
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.container}>
      <Grid item>
        <Typography className={classes.typography}>
          FocusTimer.io
        </Typography>
      </Grid>

      <Grid item>
        <IconButton onClick={() => setSettingsOpen(true)}><SettingsIcon /></IconButton>
      </Grid>

    </Grid>

  );
}
