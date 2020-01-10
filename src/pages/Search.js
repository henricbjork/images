import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const Search = () => {
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getSearch();
  }, []);

  const getSearch = async () => {
    const formData = new FormData();
    formData.append('search', 'i');

    const response = await fetch(
      'http://localhost:1111/api/search/search.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const data = await response.json();
    console.log(data);
    setUsers(data[0].users);
    setPosts(data[0].posts);
  };

  return (
    <div>
      <Nav />
      {/* {posts.length > 0 ? (
        posts.users.map(user => <p>{user.email}</p>)
      ) : (
        <p>No users</p>
      )} */}
      {/* {posts.users.map(user => (
        <p>{user.email}</p>
      ))} */}
      {console.log(posts)}
    </div>
  );
};

export default Search;
