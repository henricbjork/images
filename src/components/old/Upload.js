import React, {useState} from 'react';

const Upload = () => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = async event => {
    const data = value;
    // this works but input value does not same type string
    // const data = '56';
    console.log(data);
    event.preventDefault();

    const response = await fetch(
      'http://localhost:1111/src/backend/app/posts/upload.php',
      {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    // const json = await response.json();
    // console.log('Success:', JSON.stringify(json));
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
