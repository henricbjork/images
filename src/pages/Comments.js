import React, {useEffect, useState} from 'react';
import Nav from '../components/Nav';

const Comments = ({match}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const formData = new FormData();
    formData.append('id', match.params.id);
    const data = await fetch('http://localhost:1111/api/posts/comments.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    const response = await data.json();
    response.length ? setComments(response) : setComments(false);
    console.log(response);
  };

  const handleComment = event => {
    setNewComment(event.target.value);
  };

  const addComment = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', match.params.id);
    formData.append('comment', newComment);

    const data = await fetch('http://localhost:1111/api/posts/comment.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);
    setNewComment('');
    getComments();
  };

  return (
    <div>
      <Nav />
      <div className="content">
        {comments ? (
          comments.map(comment => (
            <p key={comment.id}>{`${comment.email} ${comment.comment}`}</p>
          ))
        ) : (
          <p>No comments</p>
        )}
        <form onSubmit={addComment}>
          <input
            type="text"
            onChange={handleComment}
            value={newComment}
            placeholder="Comment"
            required
          />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
