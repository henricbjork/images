import React, {useEffect, useState} from 'react';
import Nav from '../components/Nav';

const Comments = ({match}) => {
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const formData = new FormData();
    formData.append('id', match.params.id);
    const response = await fetch(
      'http://localhost:1111/api/posts/comments.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );
    const data = await response.json();
    data.length ? setComments(data) : setComments(false);
  };

  const handleComment = event => {
    setNewComment(event.target.value);
  };

  const addComment = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', match.params.id);
    formData.append('comment', newComment);

    const response = await fetch(
      'http://localhost:1111/api/posts/comment.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );
    setNewComment('');
    getComments();
  };

  if (comments === null) {
    return null;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        <div className="comments">
          {comments ? (
            comments.map(comment => (
              <p key={comment.id}>{`${comment.email} ${comment.comment}`}</p>
            ))
          ) : (
            <p>No comments</p>
          )}
        </div>
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
