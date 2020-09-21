import React from 'react';

import { Switch } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Route } from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export { Routes };
