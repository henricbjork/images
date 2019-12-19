import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation
} from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <p>The thing you were looking for could not be found.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
