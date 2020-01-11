import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';
import SearchUser from '../components/SearchUser';
import SearchPost from '../components/SearchPost';

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

  if (posts === null) {
    return <Nav />;
  }

  return (
    <div>
      <Nav />
      {users.length > 0 ? (
        users.map(user => <SearchUser key={user.id} user={user} />)
      ) : (
        <p>No users found</p>
      )}
      {posts.length > 0 ? (
        posts.map(post => <SearchPost key={post.id} post={post} />)
      ) : (
        <p>No posts found</p>
      )}
      {console.log(posts.id)}
    </div>
  );
};

export default Search;
