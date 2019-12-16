import React, {useState, useEffect, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {AppContext} from '../components/Context';

const UpdateUser = () => {
  const [auth, setAuth] = useContext(AppContext);
  const [user, setUser] = useContext(AppContext);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const uploadPost = async event => {
    event.preventDefault();
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const data = await fetch('http://localhost:1111/api/users/createuser.php', {
      method: 'POST',
      body: formData
    });

    const json = await data.json();
    console.log(json);

    if (json.result === 200) {
      setAuth(true);
      setUser(json.user);
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
    </div>
  );
};

export default UpdateUser;
