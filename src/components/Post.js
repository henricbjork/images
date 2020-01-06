import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Post = props => {
  const [edit, setEdit] = useState('');

  const {onUpdate} = props;

  const handleEdit = event => {
    setEdit(event.target.value);
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
    formData.append('description', edit);
    formData.append('id', props.post.id);

    const data = await fetch('http://localhost:1111/api/posts/editpost.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);
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
      <span>{props.post.description}</span>
      <span>
        {props.post.likes
          ? props.post.likes == 1
            ? `${props.post.likes} like`
            : `${props.post.likes} likes`
          : `0 likes`}
      </span>
      <button onClick={() => like(props.post.id)}>Like</button>
      <Link to={`/post/${props.post.id}`}>Comment</Link>
      <button onClick={() => deletePost(props.post.id)}>Delete</button>
      {/* <button>Edit</button> */}
      <form onSubmit={updatePost}>
        <input
          type="text"
          onChange={handleEdit}
          value={edit ? edit : props.post.description}
          placeholder="Edit post"
        />
      </form>
    </div>
  );
};

export default Post;
