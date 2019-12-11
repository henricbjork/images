import React, {useState, useEffect} from 'react';
import Items from './Items';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(
      `http://localhost:1111/src/backend/app/posts/posts.php`
      // 'https://api.unsplash.com/search/photos/?client_id=30086014b47d3da23e1a9b2fa85837f0ca041c5ce34d4bfab637c45988c5ce08&query=nature'
    );

    const response = await data.json();
    setImages(response);
  };

  return (
    <div>
      <Items data={images} />
    </div>
  );
};

export default App;
