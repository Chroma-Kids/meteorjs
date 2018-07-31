import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Teachers = new Mongo.Collection('teachers');

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
        min: 1,
      },
      lastName: {
        type: String,
        optional: false,
        min: 1,
      },
    }).validate({ firstName, lastName });

    return Teachers.insert({
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

    Teachers.remove({ _id });
  },
  update(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const firstName = updates.firstName;
    const lastName = updates.lastName;

    // TODO: Extract this and have just one validator?
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      firstName: {
        type: String,
        optional: true,
      },
      lastName: {
        type: String,
        optional: true,
      },
    }).validate({ _id, firstName, lastName });

    Teachers.update({ _id }, {
      $set: { updatedAt: moment().valueOf(), firstName, lastName }
    })
  }
}

if (Meteor.isServer) {
  Meteor.publish('teachers.all', function () {
    if (!this.userId) {
      return [];
    }
    return Teachers.find();
  });
}

Meteor.methods({
  'teachers.insert': Methods.insert,
  'teachers.remove': Methods.remove,
  'teachers.update': Methods.update,
});
