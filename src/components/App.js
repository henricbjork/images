import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppProvider} from './AppContext';
import AuthRoute from './AuthRoute';
import HideRoute from './HideRoute';
import Posts from '../pages/Posts';
import Login from '../pages/Login';
import UploadPost from '../pages/UploadPost';
import Settings from '../pages/Settings';
import CreateUser from '../pages/CreateUser';
import EditPost from '../pages/EditPost';
import NotFound from '../pages/NotFound';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={Posts} />
          <AuthRoute path="/share" component={UploadPost} />
          <AuthRoute path="/settings" component={Settings} />
          <AuthRoute path="/post/:id" component={EditPost} />
          <HideRoute path="/signup" component={CreateUser} />
          <HideRoute path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </AppProvider>
  );
};

export default App;
