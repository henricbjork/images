import React, {useState, useEffect} from 'react';

const UpdateUser = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [biography, setBiography] = useState('');

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleChangeBiography = event => {
    setBiography(event.target.value);
  };

  const uploadPost = async event => {
    event.preventDefault();
    console.log(email);
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('biography', biography);
    console.log(formData);


    const data = await fetch('http://localhost:1111/api/users/updateuser.php', {
      method: 'POST',
      body: formData
    });
    // const json = await data.json();
    // console.log(json); error when string is empty but update databse correctly
  };

  const test = () => {
    console.log('hej');

    if (email === null) {
      console.log('null')
    }
    if (email === '') {
      console.log('empty')
    }
  }

  return (
    <div>
      <button onClick={test}>SEND</button>

      <form onSubmit={uploadPost}>
        <input
          type="text"
          onChange={handleChangeBiography}
          value={biography}
          placeholder="bio"
          // required
        />
        <input
          type="email"
          onChange={handleChangeEmail}
          value={email}
          placeholder="email"
          // required
        />
        <input
          type="text"
          onChange={handleChangePassword}
          value={password}
          placeholder="password"
          // required
        />
        <button>SEND</button>
      </form>
    </div>
  );
};

export default UpdateUser;
