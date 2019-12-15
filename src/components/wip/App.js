import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Posts from './Posts';
import Upload from './Upload';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Posts} />
        <Route path="/upload" component={Upload} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
