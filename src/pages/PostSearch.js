import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const PostSearch = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  const uploadSearch = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('search', search);

    const response = await fetch(
      'http://localhost:1111/api/posts/searchpost.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );
    const data = await response.json();
    setPosts(data);
    console.log(data);
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
        {posts ? (
          posts.map(post => (
            <div>
              <img
                src={`http://localhost:1111/api/uploads/images/${post.content}`}
               alt="postimage"/>
              <p>{post.description}</p>
            </div>
          ))
        ) : (
          <p>No photos</p>
        )}
      </div>
    </div>
  );
};

export default PostSearch;
