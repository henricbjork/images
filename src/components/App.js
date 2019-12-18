import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import Posts from '../pages/Posts';
import UploadPost from '../pages/UploadPost';
import UpdateUser from '../pages/UpdateUser';
import CreateUser from '../pages/CreateUser';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import {AppProvider} from './AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div>
          <Switch>
            <AuthRoute exact path="/" component={Posts} />
            <AuthRoute path="/admin" component={Logout} />
            <AuthRoute path="/newpost" component={UploadPost} />
            <AuthRoute path="/settings" component={UpdateUser} />
            <Route path="/signup" component={CreateUser} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
