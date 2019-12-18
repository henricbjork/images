import React, {useState, useEffect, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {AppContext} from '../components/AppContext';

const CreateUser = () => {
  const [auth, setAuth] = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChangePassword = event => {
    setPassword(event.target.value);
    setErrors('');
  };
  const handleChangeEmail = event => {
    setEmail(event.target.value);
    setErrors('');
  };

  const uploadPost = async event => {
    event.preventDefault();
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const data = await fetch('http://localhost:1111/api/users/createuser.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const json = await data.json();
    console.log(json);

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
      <form onSubmit={uploadPost}>
        <input
          type="email"
          onChange={handleChangeEmail}
          value={email}
          placeholder="email"
          required
        />
        <input
          type="password"
          onChange={handleChangePassword}
          value={password}
          placeholder="password"
          required
        />
        <button>SEND</button>
      </form>
      <div>{errors}</div>
    </div>
  );
};

export default CreateUser;
