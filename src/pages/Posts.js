import React, {useState, useEffect} from 'react';
// import Items from '../components-wip/wip/Items';
import Nav from '../components/Nav';

const Posts = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(`http://localhost:1111/api/posts/getposts.php`);

    const response = await data.json();
    setImages(response);
  };

  const deletePost = async image => {
    console.log(image);
    var formData = new FormData();
    formData.append('id', image);
    const deleteData = await fetch(
      `http://localhost:1111/api/posts/deletepost.php`,
      {
        method: 'POST',
        body: formData
      }
    );

    const deleteResponse = await deleteData.json();
    console.log(deleteResponse);
    getData();
  };

  return (
    <div>
      <Nav />
      {/* <Items data={images} /> */}
      {images.map(image => (
        <div key={image.id}>
          <div>{image.content}</div>
          <button>✏️</button>
          <button onClick={() => deletePost(image.id)}>🗑</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
