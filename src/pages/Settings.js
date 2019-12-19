import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../components/AppContext';
import Nav from '../components/Nav';

const UpdateUser = () => {
  const [auth, setAuth] = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [biography, setBiography] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(
      'http://localhost:1111/api/users/usersettings.php',
      {
        credentials: 'include'
      }
    );
    const response = await data.json();
    console.log(response);
    setBiography(response.biography);
    setEmail(response.email);
    setPassword(response.password);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };
  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handleBiography = event => {
    setBiography(event.target.value);
  };

  const editUser = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('biography', biography);

    const data = await fetch('http://localhost:1111/api/users/edituser.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    // if await is enabled error when string is empty but update database correctly
    const response = await data.json();
    console.log(response);
  };

  const logout = async () => {
    const data = await fetch('http://localhost:1111/api/users/logout.php', {
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);

    localStorage.clear();
    setAuth(false);
  };

  return (
    <div>
      <Nav />
      <form>
        <input type="file"></input>
      </form>
      <form onSubmit={editUser}>
        <input
          type="text"
          onChange={handleBiography}
          value={biography}
          placeholder="bio"
        />
        <input
          type="email"
          onChange={handleEmail}
          value={email}
          placeholder="email"
        />
        <input
          type="password"
          onChange={handlePassword}
          value={password}
          placeholder="password"
        />
        <button>Save</button>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UpdateUser;
