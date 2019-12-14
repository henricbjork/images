import React, {useState} from 'react';

const Upload = () => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    console.log(event.target.files[0]);
    setValue(event.target.files[0]);
  };

  const handleSubmitold = async event => {
    const data = value;
    // this works but input value does not same type string
    // const data = '56';
    // console.log(data);
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

  const uploadPost = async event => {
    event.preventDefault();
    // // // console.log(image);
    var formData = new FormData();
    formData.append('image', value);
    formData.append('description', 'hej');
    console.log(formData);

    const deleteData = await fetch(
      'http://localhost:1111/api/uploads/uploadpost.php',
      {
        method: 'POST',
        body: formData
      }
    );

    // // const fileInput = document.querySelector('input');
    // // console.log(fileInput);

    const deleteResponse = await deleteData.json();
    console.log(deleteResponse);
    // console.log(event);
    // console.log(value);

    // console.log('hej');
  };

  return (
    <div>
      {/* <button onClick={upload}>SEND</button> */}
      <form onSubmit={uploadPost}>
        <input
          type="file"
          onChange={handleChange}
          // value={value}
          // placeholder="search"
          // required
        />
        <button>SEND</button>
      </form>
    </div>
  );
};

export default Upload;
