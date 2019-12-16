import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AppContext} from './Context';

function PrivateRoute({component: Component, ...rest}) {
  const [auth, setAuth] = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={props =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
