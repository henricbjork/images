import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
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
    if (response.avatar) {
      setAvatar(
        `http://localhost:1111/api/posts/uploads/avatars/${response.avatar}`
      );
    }
  };

  return (
    <div>
      <Nav />
      {avatar ? <img src={avatar} alt="Avatar" /> : <p>No profile image</p>}
      <p>{biography}</p>
      <Link to="/settings">Edit Profile</Link>
    </div>
  );
};

export default Profile;
