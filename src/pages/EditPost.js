import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';

const EditPost = ({match}) => {
  const [redirect, setRedirect] = useState(false);
  const [description, setDescription] = useState('');

  const handleChange = event => {
    setDescription(event.target.value);
  };

  const updatePost = async event => {
    event.preventDefault();
    console.log(match);
    var formData = new FormData();
    formData.append('description', description);
    formData.append('id', match.params.id);
    const data = await fetch('http://localhost:1111/api/posts/editpost.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    const json = await data.json();
    console.log(json);

    if (json.result === 200) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          type="text"
          onChange={handleChange}
          value={description}
          required
        />
        <button>Save</button>
      </form>
    </div>
  );
};
export default EditPost;
