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
    const response = await fetch('http://localhost:1111/api/posts/like.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    onUpdate();
  };

  const updatePost = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('description', value);
    formData.append('id', props.post.id);

    const response = await fetch(
      'http://localhost:1111/api/posts/editpost.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );
    setShow(false);
    onUpdate();
  };

  const deletePost = async post => {
    const formData = new FormData();
    formData.append('id', post);
    const response = await fetch(
      'http://localhost:1111/api/posts/deletepost.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );
    onUpdate();
  };

  return (
    <div>
      <img
        src={`http://localhost:1111/api/posts/uploads/images/${props.post.content}`}
        alt={`Post ${props.post.id}`}
      />
      <div className="content-text">
        <p>{props.post.description}</p>
        <span>{props.post.likes ? props.post.likes : 0}</span>
        {props.post.liked === 0 ? (
          <button onClick={() => like(props.post.id)}>Like</button>
        ) : (
          <button onClick={() => like(props.post.id)}>Liked</button>
        )}
        <Link to={`/post/${props.post.id}`}>Comment</Link>
        <button onClick={() => (show ? setShow(false) : setShow(true))}>
          Edit
        </button>
      </div>
      {show && (
        <div className="edit-form">
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
