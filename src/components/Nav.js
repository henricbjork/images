import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/">🏠</Link>
      <Link to="/share">📸</Link>
      <Link to="/settings">👤</Link>
    </nav>
  );
};

export default Nav;
