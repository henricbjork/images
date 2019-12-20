import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';

const Posts = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch('http://localhost:1111/api/posts/posts.php', {
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

    const response = await data.json();
    console.log(response);
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

    const response = await data.json();
    console.log(response);
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

    const response = await data.json();
    console.log(response);
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
          <p>{image.description}</p>
          <a onClick={() => like(image.id)}>Like</a>
          <span>{image.likes}</span>
          <a onClick={() => unlike(image.id)}>Dislike</a>
          <Link to={`/post/${image.id}`}>Edit</Link>
          <a onClick={() => deletePost(image.id)}>Delete</a>
        </div>
      ))}
    </div>
  );
};

export default Posts;
