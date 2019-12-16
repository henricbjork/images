import React, {useState} from 'react';
import Nav from '../components/Nav';

const Upload = () => {
  const [file, setFile] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeFile = event => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };

  const uploadPost = async event => {
    event.preventDefault();
    // // // console.log(image);
    var formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    console.log(formData);

    const deleteData = await fetch(
      'http://localhost:1111/api/uploads/uploadpost.php',
      {
        method: 'POST',
        body: formData
      }
    );

    const deleteResponse = await deleteData.json();
    console.log(deleteResponse);
  };

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
      </form>
    </div>
  );
};

export default Upload;
