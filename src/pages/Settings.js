import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const UpdateUser = () => {
  const [avatar, setAvatar] = useState('');
  const [label, setLabel] = useState('Choose avatar');
  const [biography, setBiography] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      'http://localhost:1111/api/users/usersettings.php',
      {
        credentials: 'include'
      }
    );
    const data = await response.json();
    setBiography(data.biography);
    setEmail(data.email);
  };

  const handleAvatar = event => {
    setErrors(null);
    setLabel('Avatar chosen');
    setAvatar(event.target.files[0]);
  };

  const handlePassword = event => {
    setErrors(null);
    setPassword(event.target.value);
  };

  const handleEmail = event => {
    setErrors(null);
    setEmail(event.target.value);
  };

  const handleBiography = event => {
    setErrors(null);
    setBiography(event.target.value);
  };

  const editUser = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('biography', biography);

    const response = await fetch(
      'http://localhost:1111/api/users/editusersettings.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const data = await response.json();

    !response.ok && setErrors(data.message);
    setPassword('');
  };

  const uploadAvatar = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', avatar);

    const response = await fetch(
      'http://localhost:1111/api/posts/uploadavatar.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const data = await response.json();
    if (response.ok) {
      setLabel('Saved');
    } else {
      setLabel('Choose avatar');
      setErrors(data.message);
    }
    getData();
  };

  if (biography === null && email === null) {
    return null;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        <div className="general-form">
          <form onSubmit={uploadAvatar}>
            <label>
              {label}
              <input
                type="file"
                className="fileinput"
                onChange={handleAvatar}
                required
              />
            </label>
            <button>Save</button>
          </form>
          <form onSubmit={editUser}>
            <input
              type="text"
              onChange={handleBiography}
              value={biography}
              placeholder="Biography"
            />
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
