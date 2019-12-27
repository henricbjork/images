import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await fetch('http://localhost:1111/api/users/users.php', {
      credentials: 'include'
    });
    const response = await data.json();
    console.log(response);
    setUsers(response);
  };

  const like = async post => {
    const formData = new FormData();
    formData.append('id', post);
    const data = await fetch('http://localhost:1111/api/users/like.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);
    getUsers();
  };

  return (
    <div>
      <Nav />
      {users.length > 0 ? (
        users.map(user => (
          <div key={user.id}>
            <span>{user.email}</span>
            <button onClick={() => like(user.id)}>Follow</button>
            <Link to={`/user/${user.id}`}>Profile</Link>
          </div>
        ))
      ) : (
        <div>No users</div>
      )}
    </div>
  );
};

export default Users;
