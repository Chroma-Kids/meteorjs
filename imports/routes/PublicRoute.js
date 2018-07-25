import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  layout: Layout,
  ...rest
}) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : Layout ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
            <Component {...props} />
          )
    )} />
  );

export default withTracker(() => ({
  isAuthenticated: !!Meteor.userId()
}))(PublicRoute);