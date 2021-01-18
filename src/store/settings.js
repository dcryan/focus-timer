import {createContext, useContext, useState} from 'react';

const defaults = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
}

const POMODORO = 'pomodoro';
const SHORT_BREAK = 'shortBreak';
const LONG_BREAK = 'longBreak';

const setSetting = (key, value) => localStorage.setItem(key, value);

const getSetting = (key) => {
  const value = localStorage.getItem(key);
  return value ? value: defaults[key];
}


export const SettingsContext = createContext();
export const useSettingsContext = () => useContext(SettingsContext);
export const SettingsContextProvider = ({ children }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pomodoroTime, _setPomodoroTime] = useState(parseInt(getSetting(POMODORO)));
  const [shortBreakTime, _setShortBreakTime] = useState(parseInt(getSetting(SHORT_BREAK)));
  const [longBreakTime, _setLongBreakTime] = useState(parseInt(getSetting(LONG_BREAK)));

  const setPomodoroTime = (value) => {
    _setPomodoroTime(value);
    setSetting(POMODORO, value);
  }

  const setShortBreakTime = (value) => {
    _setShortBreakTime(value);
    setSetting(SHORT_BREAK, value);
  }

  const setLongBreakTime = (value) => {
    _setLongBreakTime(value);
    setSetting(LONG_BREAK, value);
  }

  const resetDefaults = () => {
    setPomodoroTime(defaults.pomodoro);
    setShortBreakTime(defaults.shortBreak);
    setLongBreakTime(defaults.longBreak);
  };

  return (
    <SettingsContext.Provider
      value={{
        settingsOpen,
        setSettingsOpen,

        pomodoroTime,
        setPomodoroTime,
        shortBreakTime,
        setShortBreakTime,
        longBreakTime,
        setLongBreakTime,

        resetDefaults,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
