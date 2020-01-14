import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Nav from '../components/Nav';

const UpdateUser = () => {
  const [redirect, setRedirect] = useState(false);
  const [label, setLabel] = useState('Choose avatar');
  const [avatar, setAvatar] = useState('');
  const [biography, setBiography] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const response = await fetch(
      'http://localhost:1111/api/users/settings.php',
      {
        credentials: 'include'
      }
    );
    const data = await response.json();
    data.biography ? setBiography(data.biography) : setBiography('');
    data.email ? setEmail(data.email) : setEmail('');
  };

  const handleAvatar = event => {
    setErrors(null);
    setLabel('Avatar chosen');
    setAvatar(event.target.files[0]);
  };

  const handleBiography = event => {
    setErrors(null);
    setBiography(event.target.value);
  };

  const handleEmail = event => {
    setErrors(null);
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setErrors(null);
    setPassword(event.target.value);
  };

  const handlePasswordConfirm = event => {
    setErrors(null);
    setPasswordConfirm(event.target.value);
  };

  const updateSettings = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', avatar);
    formData.append('biography', biography);

    const response = await fetch(
      'http://localhost:1111/api/users/updatesettings.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const data = await response.json();
    if (response.ok) {
      setRedirect(true);
    } else {
      setLabel('Choose avatar');
      setErrors(data.message);
    }
  };

  const updateAccount = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', passwordConfirm);

    const response = await fetch(
      'http://localhost:1111/api/users/updateaccount.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const data = await response.json();
    if (response.ok) {
      setRedirect(true);
    } else {
      setPassword('');
      setErrors(data.message);
    }
  };

  if (redirect) {
    return <Redirect to="/profile" />;
  }

  if (biography === null && email === null) {
    return <Nav />;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        <div className="general-form">
          <form onSubmit={updateSettings}>
            <label>
              {label}
              <input
                type="file"
                className="file-input"
                onChange={handleAvatar}
              />
            </label>
            <input
              type="text"
              onChange={handleBiography}
              value={biography}
              placeholder="Biography"
            />
            <button>Save</button>
          </form>
          <form onSubmit={updateAccount}>
            <input
              type="email"
              onChange={handleEmail}
              value={email}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={handlePassword}
              value={password}
              placeholder="New Password"
            />
            <input
              type="password"
              onChange={handlePasswordConfirm}
              value={passwordConfirm}
              placeholder="Confirm Password"
            />
            <button>Save</button>
          </form>
          {errors && <p className="error-text">{errors}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
