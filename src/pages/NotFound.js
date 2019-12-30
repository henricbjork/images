import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <p>The thing you were looking for could not be found.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
