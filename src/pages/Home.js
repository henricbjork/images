import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';
import Post from '../components/Post';

const HomeTest = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const data = await fetch('http://localhost:1111/api/posts/posts.php', {
      credentials: 'include'
    });
    const response = await data.json();
    console.log(response);
    setPosts(response);
  };

  const handleUpdate = () => {
    getPosts();
  };

  if (posts === null) {
    return null;
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
      {/* <div className="general-form">
        <form>
          <label>
            Select file
            <input type="file" className="fileinput" required />
          </label>
          <input type="text" placeholder="Description" />
          <button>Share</button>
        </form>
      </div> */}
    </div>
  );
};

export default HomeTest;
