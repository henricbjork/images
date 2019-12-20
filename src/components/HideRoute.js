import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AppContext} from './AppContext';

const HideRoute = ({component: Component, ...rest}) => {
  const [auth, setAuth] = useContext(AppContext);

  if (localStorage.getItem('user')) {
    setAuth(true);
  }

  return (
    <Route
      {...rest}
      render={props => (auth ? <Redirect to="/" /> : <Redirect to="/login" />)}
    />
  );
};

export default HideRoute;