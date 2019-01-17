import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const TeachersNotAssigned = new Mongo.Collection('teachers_not_assigned');

export const Methods = {
  insert({ firstName, lastName }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const createdBy = Meteor.user();

    new SimpleSchema({
      teacherId: {
        type: String,
        optional: false,
        min: 1,
      }
    }).validate({ firstName, lastName });

    return TeachersNotAssigned.insert({
      teacherId,
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

    TeachersNotAssigned.remove({ _id });
  },
  update(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const firstName = updates.firstName;
    const lastName = updates.lastName;
    const classroom_id = updates.classroom_id;

    // TODO: Extract this and have just one validator?
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      teacherId: {
        type: String,
        optional: true,
      },
    }).validate({ _id, firstName, lastName, classroom_id });

    TeachersNotAssigned.update({ _id }, {
      $set: { updatedAt: moment().valueOf(), teacherId }
    })
  }
}

if (Meteor.isServer) {
  Meteor.publish('teachers-not-assigned.all', function () {
    if (!this.userId) {
      return [];
    }
    return TeachersNotAssigned.find();
  });
}

Meteor.methods({
  'teachers-not-assigned.insert': Methods.insert,
  'teachers-not-assigned.remove': Methods.remove,
  'teachers-not-assigned.update': Methods.update
});
