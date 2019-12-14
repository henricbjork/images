import React, {useState, useEffect} from 'react';
import Items from './Items';

const Posts = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
    console.log('hej');
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
  };

  return (
    <div>
      {/* <Items data={images} /> */}
      {images.map(image => (
        <div key={image.id}>
          <div>{image.content}</div>
          <button>edit</button>
          <button onClick={() => deletePost(image.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
