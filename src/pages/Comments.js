import React, {useEffect, useState} from 'react';
import Nav from '../components/Nav';

const Comments = ({match}) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
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
      </div>
    </div>
  );
};

export default Comments;
