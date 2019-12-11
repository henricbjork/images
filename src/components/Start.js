import React, {useState, useEffect} from 'react';
import Items from './Items';

const Start = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(
      `http://localhost:1111/src/backend/app/posts/posts.php`
    );

    const response = await data.json();
    setImages(response);
  };

  return <div>hej</div>;
};

export default Start;
