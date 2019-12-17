import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Posts from '../pages/Posts';
import UploadPost from '../pages/UploadPost';
import UpdateUser from '../pages/UpdateUser';
import CreateUser from '../pages/CreateUser';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import {AppProvider} from './Context';
// import {AuthContext} from './context/auth';

function App(props) {
  return (
    <AppProvider>
      <Router>
        <div>
          <Switch>
            {/* <PrivateRoute exact path="/" component={Posts} />
            <PrivateRoute path="/admin" component={Logout} />
            <PrivateRoute path="/newpost" component={UploadPost} />
            <PrivateRoute path="/settings" component={UpdateUser} />
            <Route path="/signup" component={CreateUser} />
            <Route path="/login" component={Login} /> */}
            <Route exact path="/" component={Posts} />
            <Route path="/admin" component={Logout} />
            <Route path="/newpost" component={UploadPost} />
            <Route path="/settings" component={UpdateUser} />
            <Route path="/signup" component={CreateUser} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
