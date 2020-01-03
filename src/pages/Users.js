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

  const follow = async user => {
    const formData = new FormData();
    formData.append('id', user);
    const data = await fetch('http://localhost:1111/api/users/follow.php', {
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
            <button
              onClick={() => follow(user.id)}
            >{`Follow ${user.email}`}</button>
          </div>
        ))
      ) : (
        <div>No users</div>
      )}
    </div>
  );
};

export default Users;