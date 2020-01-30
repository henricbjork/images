import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Comment = props => {
  const [editComment, setEditComment] = useState('');
  const [show, setShow] = useState(false);

  const {onUpdate} = props;

  const handleEditComment = event => {
    setEditComment(event.target.value);
  };

  const editCommentFetch = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', props.comment.id);
    formData.append('comment', editComment);

    const response = await fetch(
      'http://localhost:1111/api/posts/updatecomment.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );
    onUpdate();
    setEditComment('');
  };

  const deleteComment = async id => {
    const formData = new FormData();
    formData.append('id', id);

    const response = await fetch(
      'http://localhost:1111/api/posts/deletecomment.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    onUpdate();
    setShow(false);
  };

  return (
    <div>
      <p>{props.comment.comment}</p>
      {props.comment.edit === 1 && (
        <button onClick={() => (show ? setShow(false) : setShow(true))}>
          Edit
        </button>
      )}
      {show && (
        <div>
          <form onSubmit={editCommentFetch}>
            <input
              type="text"
              onChange={handleEditComment}
              value={editComment}
              placeholder="Edit Comment"
              required
            />
            <button class="comment-button-edit">Save</button>
          </form>
          <button
            class="comment-button-delete"
            onClick={() => deleteComment(props.comment.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
