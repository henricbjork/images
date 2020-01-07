import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Post = props => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  const {onUpdate} = props;

  useEffect(() => {
    setValue(props.post.description);
  }, []);

  const handleEdit = event => {
    setValue(event.target.value);
  };

  const like = async post => {
    const formData = new FormData();
    formData.append('id', post);
    const data = await fetch('http://localhost:1111/api/posts/like.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);
    onUpdate();
  };

  const updatePost = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('description', value);
    formData.append('id', props.post.id);

    const data = await fetch('http://localhost:1111/api/posts/editpost.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);
    setShow(false);
    onUpdate();
  };

  const deletePost = async post => {
    const formData = new FormData();
    formData.append('id', post);
    const data = await fetch('http://localhost:1111/api/posts/deletepost.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);
    onUpdate();
  };

  return (
    <div>
      <img
        src={`http://localhost:1111/api/posts/uploads/images/${props.post.content}`}
        alt={`Post ${props.post.id}`}
      />
      <p>{props.post.description}</p>
      <span>{props.post.likes ? props.post.likes : 0}</span>
      <button onClick={() => like(props.post.id)}>Like</button>
      <Link to={`/post/${props.post.id}`}>Comment</Link>
      <button onClick={() => (show ? setShow(false) : setShow(true))}>
        Edit
      </button>
      {show && (
        <div>
          <form onSubmit={updatePost}>
            <input
              type="text"
              onChange={handleEdit}
              value={value}
              placeholder="Edit post"
            />
            <button>Save</button>
          </form>
          <button onClick={() => deletePost(props.post.id)}>Delete</button>
          <button onClick={() => setShow(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Post;
