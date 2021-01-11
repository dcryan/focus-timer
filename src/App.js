import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeContextProvider, SettingsContextProvider} from './store';
import {Page} from './routes';

function App() {

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <SettingsContextProvider>
        <Page />
      </SettingsContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
