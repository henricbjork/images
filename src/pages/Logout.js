import React, {useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {AppContext} from '../components/Context';

function Logout(props) {
  const [auth, setAuth] = useContext(AppContext);
  const logout = () => {
    setAuth(false);
    if (!auth) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
