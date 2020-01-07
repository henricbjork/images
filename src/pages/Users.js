import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const Users = () => {
  const [users, setUsers] = useState(null);

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

  if (users === null) {
    return null;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        {users.length > 0 ? (
          users.map(user => (
            <div className="users-text" key={user.id}>
              {user.followed === 0 ? (
                <button
                  onClick={() => follow(user.id)}
                >{`Follow ${user.email}`}</button>
              ) : (
                <button
                  onClick={() => follow(user.id)}
                >{`Following ${user.email}`}</button>
              )}
            </div>
          ))
        ) : (
          <p>No users</p>
        )}
      </div>
    </div>
  );
};

export default Users;
