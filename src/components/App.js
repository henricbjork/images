import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppProvider} from './AppContext';
import AuthRoute from './AuthRoute';
import Posts from '../pages/Posts';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import UploadPost from '../pages/UploadPost';
import EditUser from '../pages/EditUser';
import CreateUser from '../pages/CreateUser';
import EditPost from '../pages/EditPost';
import NotFound from '../pages/NotFound';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={Posts} />
          <AuthRoute path="/admin" component={Logout} />
          <AuthRoute path="/newpost" component={UploadPost} />
          <AuthRoute path="/settings" component={EditUser} />
          <AuthRoute path="/post/:id" component={EditPost} />
          <Route path="/signup" component={CreateUser} />
          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </AppProvider>
  );
};

export default App;
