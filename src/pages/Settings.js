import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const UpdateUser = () => {
  const [avatar, setAvatar] = useState('');
  const [label, setLabel] = useState('Choose avatar');
  const [biography, setBiography] = useState(null);
  const [email, setEmail] = useState(null);
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
  };

  const handleAvatar = event => {
    setErrors('');
    setLabel('Avatar chosen');
    setAvatar(event.target.files[0]);
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

    response.result === 400 && setErrors(response.message);

    setPassword('');
    console.log(response);
  };

  const uploadAvatar = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', avatar);
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

    response.result === 400 && setErrors(response.message);

    console.log(response);
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
          <div>{errors}</div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
