import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {AppContext} from '../components/AppContext';
import Nav from '../components/Nav';

const Profile = () => {
  const [auth, setAuth] = useContext(AppContext);
  const [avatar, setAvatar] = useState(null);
  const [biography, setBiography] = useState('');

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
    data.avatar
      ? setAvatar(
          `http://localhost:1111/api/posts/uploads/avatars/${data.avatar}`
        )
      : setAvatar('');
  };

  const logout = async () => {
    const response = await fetch('http://localhost:1111/api/users/logout.php', {
      credentials: 'include'
    });

    localStorage.clear();
    setAuth(false);
  };

  if (avatar === null) {
    return null;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        {avatar ? <img src={avatar} alt="Avatar" /> : <p>No avatar</p>}
        <div className="profile-text">
          <p>{biography}</p>
          <Link to="/settings">
            <button>Edit Profile</button>
          </Link>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
