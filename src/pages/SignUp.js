import React, {useState, useContext} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {AppContext} from '../components/AppContext';

const SignUp = () => {
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

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const data = await fetch('http://localhost:1111/api/users/createuser.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);

    if (response.result === 200) {
      localStorage.setItem('user', response.user);
      setAuth(true);
    } else {
      setErrors(response.message);
    }

    setPassword('');
  };

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <p className="login-text">
        Sign up to see photos and videos from your friends.
      </p>
      <form onSubmit={login}>
        <input
          type="email"
          onChange={handleEmail}
          value={email}
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={handlePassword}
          value={password}
          placeholder="Password"
          required
        />
        <button>Sign Up</button>
      </form>
      <span className="error-text">{errors}</span>
      <Link className="login-text" to="/login">
        Have an account? Login
      </Link>
    </div>
  );
};

export default SignUp;
