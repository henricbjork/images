import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch('http://localhost:1111/api/posts/posts.php', {
      credentials: 'include'
    });
    const data = await response.json();
    setPosts(data);
  };

  const handleUpdate = () => {
    getPosts();
  };

  if (posts === null) {
    return <Nav />;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        {posts.length > 0 ? (
          posts.map(post => (
            <Post key={post.id} onUpdate={() => handleUpdate()} post={post} />
          ))
        ) : (
          <p>
            To enjoy Instagram <Link to="/users">follow</Link> people or{' '}
            <Link to="/share">share</Link> photos.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
