import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const setReminderTime = (time) => {
    setSelectedTime(time);
  };

  return (
    <AppContext.Provider value={{ selectedTime, setReminderTime }}>
      {children}
    </AppContext.Provider>
  );
};
