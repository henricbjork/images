import React, {useState, useEffect} from 'react';
import Items from './Items';

// const App = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     const data = await fetch(
//       `http://localhost:1111/src/backend/app/posts/posts.php`
//       // 'https://api.unsplash.com/search/photos/?client_id=30086014b47d3da23e1a9b2fa85837f0ca041c5ce34d4bfab637c45988c5ce08&query=nature'
//     );

//     const response = await data.json();
//     setImages(response);
//   };

//   return (
//     <div>
//       <Items data={images} />
//     </div>
//   );
// };
const App = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    // getData();
  }, []);

  const getData = async () => {
    const data = await fetch(
      `http://localhost:1111/src/backend/app/posts/posts.php`
      // 'https://api.unsplash.com/search/photos/?client_id=30086014b47d3da23e1a9b2fa85837f0ca041c5ce34d4bfab637c45988c5ce08&query=nature'
    );

    const response = await data.json();
    setValue(response);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    const data = value;
    console.log(data);

    fetch(`http://localhost:1111/src/backend/app/posts/posts.php`, {
      method: 'POST',
      mode: 'cors',
      body: data
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    });
    event.preventDefault();
  };

  return (
    <div>
      {/* <Items data={images} /> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="search"
          required
        />
        <button>SEND</button>
      </form>
    </div>
  );
};

export default App;
