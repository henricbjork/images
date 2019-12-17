import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../components/Context';

import Nav from '../components/Nav';

const Posts = () => {
  const [redirect, setRedirect] = useContext(AppContext);
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch('http://localhost:1111/api/posts/getposts.php', {
      credentials: 'include'
    });
    const response = await data.json();
    setImages(response);
    setRedirect(false);
  };

  const toggleInput = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const updatePost = async image => {
    console.log(image);
    // console.log(image.id);
  };

  const handleChange = event => {
    setDescription(event.target.value);
  };

  const deletePost = async image => {
    console.log(image);
    var formData = new FormData();
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

  return (
    <div>
      <Nav />
      {/* <Items data={images} /> */}
      {images.map(image => (
        <div key={image.id}>
          <div>{image.content}</div>
          <div>{image.description}</div>
          <div style={{display: show ? 'block' : 'none'}}>
            <input
              type="text"
              onChange={handleChange}
              value={description}
              required
            />
            <button onClick={() => updatePost(image.id)}>Save</button>
          </div>
          <button onClick={() => toggleInput()}>✏️</button>
          <button onClick={() => deletePost(image.id)}>🗑</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
