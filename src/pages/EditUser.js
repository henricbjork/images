import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const UpdateUser = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [biography, setBiography] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const formData = new FormData();
    formData.append('id', match.params.id);
    const data = await fetch(
      'http://localhost:1111/api/users/usersettings.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );
    const response = await data.json();
    console.log(response);
    // setDescription(response.description);
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleChangeBiography = event => {
    setBiography(event.target.value);
  };

  const uploadPost = async event => {
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

  return (
    <div>
      <Nav />
      <form onSubmit={uploadPost}>
        <input
          type="text"
          onChange={handleChangeBiography}
          value={biography}
          placeholder="bio"
        />
        <input
          type="email"
          onChange={handleChangeEmail}
          value={email}
          placeholder="email"
        />
        <input
          type="password"
          onChange={handleChangePassword}
          value={password}
          placeholder="password"
        />
        <button>Save</button>
      </form>
    </div>
  );
};

export default UpdateUser;
