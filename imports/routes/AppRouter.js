import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { DashboardLayout } from '../ui/layouts/DashboardLayout';
import { SignupContainer as Signup } from '../ui/Signup';
import { Dashboard } from '../ui/Dashboard';
import { NotFound } from '../ui/NotFound';
import { LoginContainer as Login } from '../ui/Login';
import { StudentsPageContainer as StudentsPage } from '../ui/students/StudentsPage';
import { TeachersPageContainer as TeachersPage } from '../ui/teachers/TeachersPage';

export const history = createHistory()

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={Login} exact={true} />
      <PublicRoute path="/signup" component={Signup} />
      <PrivateRoute path="/dashboard" component={Dashboard} layout={DashboardLayout} exact={true} />
      <PrivateRoute path="/students" component={StudentsPage} layout={DashboardLayout} exact={true} />
      <PrivateRoute path="/teachers" component={TeachersPage} layout={DashboardLayout} exact={true} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);