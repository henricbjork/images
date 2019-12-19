import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/">🏠</Link>
      <Link to="/share">📸</Link>
      <Link to="/settings">👤</Link>
      <Link to="/admin">🚶</Link>
    </nav>
  );
};

export default Nav;
