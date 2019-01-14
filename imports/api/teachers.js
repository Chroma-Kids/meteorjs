import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';
import { TeachersNotAssigned } from './teachers-not-assigned';

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

    teacherId = Teachers.insert({
      firstName,
      lastName,
      classroom_id: undefined,
      createdBy: { _id: createdBy._id, username: createdBy.username },
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });

    TeachersNotAssigned.insert({
      teacherId,
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });

    return teacherId;
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
    const classroom_id = updates.classroom_id;

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
      classroom_id: {
        type: String,
        min: 1,
      },
    }).validate({ _id, firstName, lastName, classroom_id });

    Teachers.update({ _id }, {
      $set: { updatedAt: moment().valueOf(), firstName, lastName, classroom_id }
    })
  },
  // moveTeacherToClassroom(source.getItem().teacherId, source.getItem().classroomId, props.classroomId, source.getItem().recording)
  moveTeacherToClassroom(teacher_id, source_classroom_id, dest_classroom_id) {

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
  'teachers.moveTeacherToClassroom': Methods.moveTeacherToClassroom,
});
