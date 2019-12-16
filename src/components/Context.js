import React, {useState, createContext} from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');

  return (
    <AppContext.Provider value={[auth, setAuth, user, setUser]}>
      {props.children}
    </AppContext.Provider>
  );
};
