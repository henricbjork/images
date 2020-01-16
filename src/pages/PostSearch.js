import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';

const NotFound = () => {
  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState('');

  const uploadSearch = async event => {
    event.preventDefault();
    const response = await fetch(
      'http://localhost:1111/api/posts/searchpost.php',
      {
        credentials: 'include'
      }
    );
    const data = await response.json();
    // setPosts(data);
    // console.log(posts);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Nav />
      <div className="content">
        <form onSubmit={uploadSearch}>
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            placeholder="Search"
            required
          />
          <button>Send</button>
        </form>
        <h1>Hello world</h1>
      </div>
    </div>
  );
};

export default NotFound;
