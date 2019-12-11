import React, {useState} from 'react';

const Upload = () => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = async event => {
    const data = value;
    // this works but input value does not same type string
    // const data = '1';
    console.log(data);
    event.preventDefault();

    const url = 'http://localhost:1111/src/backend/app/posts/upload.php';
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        body: data,
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
      {/* <button onClick={upload}>SEND</button> */}
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

export default Upload;
