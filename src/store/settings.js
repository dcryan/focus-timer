import {createContext, useContext, useState} from 'react';

const defaults = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
}

export const SettingsContext = createContext();
export const useSettingsContext = () => useContext(SettingsContext);
export const SettingsContextProvider = ({ children }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(defaults.pomodoroTime);
  const [shortBreakTime, setShortBreakTime] = useState(defaults.shortBreakTime);
  const [longBreakTime, setLongBreakTime] = useState(defaults.longBreakTime);

  const resetDefaults = () => {
    setPomodoroTime(defaults.pomodoroTime);
    setShortBreakTime(defaults.shortBreakTime);
    setLongBreakTime(defaults.longBreakTime);
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
