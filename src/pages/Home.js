import React, {useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {AppContext} from '../components/Context';

function Home(props) {
  const [user, setUser] = useContext(AppContext);

  return (
    <div>
      <nav>
        <Link to="/">Home Page</Link>
        <Link to="/admin">Admin Page</Link>
        {/* <Link to="/login">Login</Link> */}
      </nav>
      <div>Home</div>
    </div>
  );
}

export default Home;
