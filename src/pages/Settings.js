import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../components/AppContext';
import Nav from '../components/Nav';

const UpdateUser = () => {
  const [auth, setAuth] = useContext(AppContext);
  const [file, setFile] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [biography, setBiography] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

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
    if (response.avatar) {
      setAvatar(
        `http://localhost:1111/api/posts/uploads/avatars/${response.avatar}`
      );
    }
  };

  const handleFile = event => {
    setErrors('');
    setFile(event.target.files[0]);
  };

  const handlePassword = event => {
    setErrors('');
    setPassword(event.target.value);
  };

  const handleEmail = event => {
    setErrors('');
    setEmail(event.target.value);
  };

  const handleBiography = event => {
    setErrors('');
    setBiography(event.target.value);
  };

  const editUser = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('biography', biography);

    const data = await fetch(
      'http://localhost:1111/api/users/editusersettings.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const response = await data.json();

    if (response.result === 400) {
      setErrors(response.message);
    }

    setPassword('');
    console.log(response);
  };

  const uploadAvatar = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    console.log(formData);

    const data = await fetch(
      'http://localhost:1111/api/posts/uploadavatar.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const response = await data.json();

    if (response.result === 400) {
      setErrors(response.message);
    }

    console.log(response);
    getData();
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
      {avatar ? <img src={avatar} alt="Avatar" /> : <p>No profile image</p>}
      <form onSubmit={uploadAvatar}>
        <input type="file" onChange={handleFile} required />
        <button>Save</button>
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
          required
        />
        <input
          type="password"
          onChange={handlePassword}
          value={password}
          placeholder="password"
        />
        <button>Save</button>
      </form>
      <div>{errors}</div>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default UpdateUser;
