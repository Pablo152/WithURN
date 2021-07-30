import React from 'react';

export const PreferencesContext = React.createContext({
  toggleTheme: (): void => {},
  isThemeDark: false,
});
