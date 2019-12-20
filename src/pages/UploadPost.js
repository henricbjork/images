import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Nav from '../components/Nav';

const Upload = () => {
  const [redirect, setRedirect] = useState(false);
  const [file, setFile] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleFile = event => {
    setFile(event.target.files[0]);
  };

  const handleDescription = event => {
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

    const response = await data.json();
    console.log(response);

    if (response.result === 200) {
      setRedirect(true);
    } else {
      setErrors(response.message);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Nav />
      <form onSubmit={uploadPost}>
        <input type="file" onChange={handleFile} required />
        <input
          type="text"
          onChange={handleDescription}
          value={description}
          placeholder="Description"
        />
        <button>Share</button>
        <div>{errors}</div>
      </form>
    </div>
  );
};

export default Upload;
