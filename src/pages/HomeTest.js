import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';

const HomeTest = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

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

  const handleComment = event => {
    setComment(event.target.value);
  };

  const uploadComment = event => {
    event.preventDefault();
    console.log('hej');
  };

  const deletePost = async post => {
    const formData = new FormData();
    formData.append('id', post);
    const data = await fetch('http://localhost:1111/api/posts/deletepost.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);
    getPosts();
  };

  const like = async post => {
    const formData = new FormData();
    formData.append('id', post);
    const data = await fetch('http://localhost:1111/api/posts/like.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);
    getPosts();
  };

  return (
    <div>
      <Nav />
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id}>
            <img
              src={`http://localhost:1111/api/posts/uploads/images/${post.content}`}
              alt={`Post ${post.id}`}
            />
            <p>{post.description}</p>
            <span>{post.likes ? post.likes : 0}</span>
            <button onClick={() => like(post.id)}>Like</button>
            <Link to={`/post/${post.id}`}>Edit</Link>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <form onSubmit={uploadComment}>
              <input
                type="text"
                onChange={handleComment}
                value={comment}
                placeholder="Comment"
              />
            </form>
          </div>
        ))
      ) : (
        <p>To enjoy Instagram follow people or share photos.</p>
      )}
    </div>
  );
};

export default HomeTest;
