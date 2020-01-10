import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/share">Share</Link>
      <Link to="/search">Search</Link>
      <Link to="/users">Users</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
};

export default Nav;
