import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/start">Start</Link>
    </nav>
  );
};

export default Nav;
