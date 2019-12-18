import React, {useState, useEffect, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
// import {AuthContext} from '../components-old/context/auth';
import {AppContext} from '../components/Context';

const Start = () => {
  const [auth, setAuth] = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const handlePassword = event => {
    setPassword(event.target.value);
    setErrors('');
  };
  const handleEmail = event => {
    setEmail(event.target.value);
    setErrors('');
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
      body: formData,
      credentials: 'include'
    });
    const json = await data.json();
    console.log('Success:', JSON.stringify(json));
    if (json.result === 200) {
      sessionStorage.setItem('user', json.user);
      setAuth(true);
    } else {
      setErrors(json.message);
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
          type="password"
          onChange={handlePassword}
          value={password}
          placeholder="password"
          required
        />
        <button>Login</button>
      </form> */}
      <div>{errors}</div>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Start;
