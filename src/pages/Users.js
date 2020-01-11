import React, {useState} from 'react';
import Nav from '../components/Nav';
import User from '../components/User';

const Users = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(null);

  const getUsers = async () => {
    const formData = new FormData();
    formData.append('search', search);

    const response = await fetch('http://localhost:1111/api/users/search.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const data = await response.json();
    console.log(data);
    data.length > 0 ? setUsers(data) : setErrors('No users found');
  };

  const handleSearch = event => {
    setErrors(null);
    setSearch(event.target.value);
  };

  const uploadSearch = async event => {
    event.preventDefault();
    getUsers();
  };

  const handleUpdate = async () => {
    getUsers();
  };

  return (
    <div>
      <Nav />
      <div className="content">
        <div className="general-form">
          <form onSubmit={uploadSearch}>
            <input
              type="text"
              onChange={handleSearch}
              value={search}
              placeholder="Search users"
              required
            />
            <button>Send</button>
          </form>
          {users.length > 0 &&
            users.map(user => (
              <User key={user.id} onUpdate={() => handleUpdate()} user={user} />
            ))}
          {errors && <p className="users-text">{errors}</p>}
        </div>
      </div>
    </div>
  );
};

export default Users;
