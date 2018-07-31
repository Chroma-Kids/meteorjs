import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import React from 'react';
import { AppRouter } from '../imports/routes/AppRouter';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
});
