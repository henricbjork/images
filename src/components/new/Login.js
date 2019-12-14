import React, {useState, useEffect} from 'react';

const Start = () => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const login = async () => {
    var formData = new FormData();
    formData.append('email', 'bob@belcher.com');
    formData.append('password', 'bob');

    const data = await fetch('http://localhost:1111/api/users/login.php', {
      method: 'POST',
      body: formData
    });
    const json = await data.json();
    console.log('Success:', JSON.stringify(json));
  };

  return (
    <div>
      <button onClick={login}>SEND</button>
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
