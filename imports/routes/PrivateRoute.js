import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  layout: Layout,
  ...rest
}) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? Layout ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
    )} />
  );

export default withTracker(() => ({
  isAuthenticated: !!Meteor.userId()
}))(PrivateRoute);