import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AppContext} from './AppContext';

const HideRoute = ({component: Component, ...rest}) => {
  const [auth, setAuth] = useContext(AppContext);

  localStorage.getItem('user') && setAuth(true);

  return (
    <Route
      {...rest}
      render={props => (auth ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export default HideRoute;
