import React, {useState, useEffect, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
// import {AuthContext} from '../components-old/context/auth';
import {AppContext} from '../components/Context';

const Start = () => {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const [auth, setAuth] = useState();
  const [auth, setAuth] = useContext(AppContext);
  const [user, setUser] = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // useEffect(() => {}, [user]);

  const handlePassword = event => {
    setPassword(event.target.value);
  };
  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const login = async event => {
    event.preventDefault();
    var formData = new FormData();
    formData.append('email', 'bob@belcher.com');
    formData.append('password', 'bob');
    // formData.append('email', email);
    // formData.append('password', password);

    const data = await fetch('http://localhost:1111/api/users/login.php', {
      method: 'POST',
      body: formData
    });
    const json = await data.json();
    console.log('Success:', JSON.stringify(json));
    if (json.result === 200) {
      // setLoggedIn(true);
      setAuth(true);
      setUser(json.user);
    }
  };

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <button onClick={login}>Login</button>
      {/* <form onSubmit={login}>
        <input
          type="email"
          onChange={handleEmail}
          value={email}
          placeholder="email"
          required
        />
        <input
          type="text"
          onChange={handlePassword}
          value={password}
          placeholder="password"
          required
        />
        <button>Login</button>
      </form> */}
    </div>
  );
};

export default Start;
