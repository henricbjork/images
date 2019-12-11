import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Posts from './Posts';
import Upload from './Upload';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Posts} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </Router>
  );
};

export default App;
