import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Layout } from '../ui/common/Layout';
import { SignupContainer as Signup } from '../ui/Signup';
import { NotFound } from '../ui/NotFound';
import { LoginContainer as Login } from '../ui/Login';
import { StudentsPageContainer as StudentsPage } from '../ui/students/StudentsPage';
import { TeachersPageContainer as TeachersPage } from '../ui/teachers/TeachersPage';
import { ClassroomsPageContainer as ClassroomsPage } from '../ui/classrooms/ClassroomsPage';
import { DashboardPageContainer as DashboardPage } from '../ui/dashboard/DashboardPage';

import '../client/styles/bootstrap.min.css';
import '../client/styles/style.css';

export const history = createHistory()

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={Login} exact={true} />
      <PublicRoute path="/signup" component={Signup} />
      <PrivateRoute path="/dashboard" component={DashboardPage} layout={Layout} exact={true} />
      <PrivateRoute path="/students" component={StudentsPage} layout={Layout} exact={true} />
      <PrivateRoute path="/teachers" component={TeachersPage} layout={Layout} exact={true} />
      <PrivateRoute path="/classrooms" component={ClassroomsPage} layout={Layout} exact={true} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
