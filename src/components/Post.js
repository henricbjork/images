import React, {useState} from 'react';

const Post = props => {
  const [edit, setEdit] = useState('');
  const [comment, setComment] = useState('');

  const {onUpdate} = props;

  const handleEdit = event => {
    setEdit(event.target.value);
  };

  const handleComment = event => {
    setComment(event.target.value);
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

  const addComment = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', props.post.id);
    formData.append('comment', comment);

    const data = await fetch('http://localhost:1111/api/posts/comment.php', {
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
        loading="lazy"
      />
      <p>{props.post.description}</p>
      <span>{props.post.likes ? props.post.likes : 0}</span>
      <button onClick={() => like(props.post.id)}>Like</button>
      <form onSubmit={updatePost}>
        <input
          type="text"
          onChange={handleEdit}
          /* Workable not optimal */
          value={edit ? edit : props.post.description}
          placeholder="Edit post"
        />
      </form>
      <button onClick={() => deletePost(props.post.id)}>Delete</button>
      <form onSubmit={addComment}>
        <input
          type="text"
          onChange={handleComment}
          value={comment}
          placeholder="Comment"
        />
      </form>
    </div>
  );
};

export default Post;
