import React, {useState, createContext} from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
  const [auth, setAuth] = useState(false);

  return (
    <AppContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AppContext.Provider>
  );
};
