import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Students = new Mongo.Collection('students');

export const Methods = {
  insert({ firstName, lastName }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const createdBy = Meteor.user();

    new SimpleSchema({
      firstName: {
        type: String,
        optional: false,
        min: 5,
      },
      lastName: {
        type: String,
        optional: false,
        min: 5,
      },
    }).validate({ firstName, lastName });

    return Students.insert({
      firstName,
      lastName,
      createdBy: { _id: createdBy._id, username: createdBy.username },
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });
  },
  remove(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      }
    }).validate({ _id });

    Students.remove({ _id });
  },
}

if (Meteor.isServer) {
  Meteor.publish('students.all', function () {
    if (!this.userId) {
      return [];
    }
    return Students.find();
  });
}

Meteor.methods({
  'students.insert': Methods.insert,
  'students.remove': Methods.remove,
});
