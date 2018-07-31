import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';
import '../imports/api/students';
import '../imports/api/teachers';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => { });
