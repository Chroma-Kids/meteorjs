import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { AppRouter, history, onAuthChange } from '../imports/routes/AppRouter';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
});
