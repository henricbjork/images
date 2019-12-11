import React, {useState} from 'react';

const Upload = () => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  // const handleSubmit = event => {
  //   const data = value;
  //   console.log(data);

  //   fetch(`http://localhost:1111/src/backend/app/posts/upload.php`, {
  //     method: 'POST',
  //     body: data,
  //     // mode: 'cors',
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });
  //   event.preventDefault();
  // };

  const handleSubmit = event => {
    const data = value;
    console.log(data);

    fetch(`http://localhost:1111/src/backend/app/posts/upload.php`, {
      method: 'POST',
      body: data,
      // mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  const upload = async () => {
    const url = 'http://localhost:1111/src/backend/app/posts/upload.php';
    const data = {username: 'yo'};

    // try {
    //   const response = await fetch(url, {
    //     method: 'POST', // or 'PUT'
    //     body: JSON.stringify(data), // data can be `string` or {object}!
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });

    //   const json = await response.json();
    //   console.log('Success:', JSON.stringify(json));
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data),
        mode: 'cors',

        headers: {
          'Content-Type': 'application/json'
        }
      });
      // const json = await response.json();
      // console.log('Success:', JSON.stringify(json));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={upload}>SEND</button>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          name="text"
          onChange={handleChange}
          placeholder="search"
          required
        />
        <button>SEND</button>
      </form> */}
    </div>
  );
};

export default Upload;
