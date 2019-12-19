import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';

const Posts = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch('http://localhost:1111/api/posts/getposts.php', {
      credentials: 'include'
    });
    const response = await data.json();
    setImages(response);
  };

  const deletePost = async image => {
    const formData = new FormData();
    formData.append('id', image);
    const data = await fetch('http://localhost:1111/api/posts/deletepost.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const json = await data.json();
    console.log(json);
    getData();
  };

  const like = async image => {
    const formData = new FormData();
    formData.append('id', image);
    const data = await fetch('http://localhost:1111/api/posts/like.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const json = await data.json();
    console.log(json);
    getData();
  };

  const unlike = async image => {
    const formData = new FormData();
    formData.append('id', image);
    const data = await fetch('http://localhost:1111/api/posts/unlike.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const json = await data.json();
    console.log(json);
    getData();
  };

  return (
    <div>
      <Nav />
      {images.map(image => (
        <div key={image.id}>
          <img
            src={
              'http://localhost:1111/api/posts/uploads/images/' + image.content
            }
          />
          <div>{image.description}</div>
          <span>{image.likes}</span>
          <a onClick={() => like(image.id)}>❤️</a>
          <a onClick={() => unlike(image.id)}>💔</a>
          <Link to={`/post/${image.id}`}>✏️</Link>
          <a onClick={() => deletePost(image.id)}>🗑</a>
        </div>
      ))}
    </div>
  );
};

export default Posts;
