import React, {useState, createContext} from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
  const [redirect, setRedirect] = useState(false);

  return (
    <AppContext.Provider
      value={[auth, setAuth, user, setUser, redirect, setRedirect]}
    >
      {props.children}
    </AppContext.Provider>
  );
};
