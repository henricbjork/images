import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppProvider} from './AppContext';
import AuthRoute from './AuthRoute';
import HideRoute from './HideRoute';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Users from '../pages/Users';
import EditPost from '../pages/EditPost';
import Share from '../pages/Share';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import HomeTest from '../pages/HomeTest';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={HomeTest} />
          {/* <AuthRoute path="/home" component={Home} /> */}
          <AuthRoute path="/post/:id" component={EditPost} />
          <AuthRoute path="/share" component={Share} />
          <AuthRoute path="/settings" component={Settings} />
          <AuthRoute path="/profile" component={Profile} />
          <AuthRoute path="/users" component={Users} />
          <HideRoute path="/login" component={Login} />
          <HideRoute path="/signup" component={SignUp} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </AppProvider>
  );
};

export default App;
