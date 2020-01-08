import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Nav from '../components/Nav';

const Share = () => {
  const [redirect, setRedirect] = useState(false);
  const [file, setFile] = useState('');
  const [label, setLabel] = useState('Choose a file');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState(null);

  const handleFile = event => {
    setErrors('');
    setLabel('File selected');
    setFile(event.target.files[0]);
  };

  const handleDescription = event => {
    setErrors('');
    setDescription(event.target.value);
  };

  const uploadPost = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);

    const response = await fetch(
      'http://localhost:1111/api/posts/uploadpost.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const data = await response.json();
    if (response.ok) {
      setRedirect(true);
    } else {
      setLabel('Choose a file');
      setErrors(data.message);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        <div className="general-form">
          <form onSubmit={uploadPost}>
            <label>
              {label}
              <input
                type="file"
                className="fileinput"
                onChange={handleFile}
                required
              />
            </label>
            <input
              type="text"
              onChange={handleDescription}
              value={description}
              placeholder="Description"
            />
            <button>Share</button>
            {errors && <p className="error-text">{errors}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Share;
