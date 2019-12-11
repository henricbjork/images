import React, {useState, useEffect} from 'react';

const Start = () => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = async event => {
    // const data = value;
    // this works but input value does not same type string
    const data = {email: 'bob@belcher.com'};
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
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>SEND</button>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="search"
          required
        />
        <button>SEND</button>
      </form> */}
    </div>
  );
};

export default Start;
