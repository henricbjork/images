import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const SearchPost = props => {
  return (
    <div>
      {console.log(props)}
      <img
        src={`http://localhost:1111/api/posts/uploads/images/${props.post.content}`}
        alt={`Post ${props.post.id}`}
      />
      <div className="content-text">
        <p>{props.post.description}</p>
      </div>
    </div>
  );
};
export default SearchPost;
