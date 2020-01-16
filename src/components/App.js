import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppProvider} from './AppContext';
import AuthRoute from './AuthRoute';
import HideRoute from './HideRoute';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Comments from '../pages/Comments';
import Share from '../pages/Share';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import PostSearch from '../pages/PostSearch';

const App = () => {
  return (
    <div className="wrapper">
      <AppProvider>
        <Router>
          <Switch>
            <AuthRoute exact path="/" component={Home} />
            <AuthRoute path="/post/:id" component={Comments} />
            <AuthRoute path="/share" component={Share} />
            <AuthRoute path="/settings" component={Settings} />
            <AuthRoute path="/profile" component={Profile} />
            <AuthRoute path="/users" component={Users} />
            <AuthRoute path="/searchpost" component={PostSearch} />
            <HideRoute path="/login" component={Login} />
            <HideRoute path="/signup" component={SignUp} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </AppProvider>
    </div>
  );
};

export default App;
