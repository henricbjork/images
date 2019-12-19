import React, {useState, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Nav from '../components/Nav';

const Upload = () => {
  const [redirect, setRedirect] = useState(false);
  const [file, setFile] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChangeFile = event => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };

  const uploadPost = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    console.log(formData);

    const data = await fetch('http://localhost:1111/api/posts/uploadpost.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const json = await data.json();
    console.log(json);

    if (json.result === 200) {
      setRedirect(true);
    } else {
      setErrors(json.message);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Nav />
      <form onSubmit={uploadPost}>
        <input type="file" onChange={handleChangeFile} required />
        <input
          type="text"
          onChange={handleChangeDescription}
          value={description}
        />
        <button>SEND</button>
        <div>{errors}</div>
      </form>
    </div>
  );
};

export default Upload;
