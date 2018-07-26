import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(error => new Meteor.Error(400, { name: error.details[0].name, message: error.details[0].message }));
