import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';
import Post from '../components/Post';

const HomeTest = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <Nav />
      {posts.length > 0 ? (
        posts.map(post => (
          <Post key={post.id} onUpdate={() => handleUpdate()} post={post} />
        ))
      ) : (
        <p>To enjoy Instagram follow people or share photos.</p>
      )}
    </div>
  );
};

export default HomeTest;