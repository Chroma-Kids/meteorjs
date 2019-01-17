import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';
import { Teacher } from './teachers';


export const Classrooms = new Mongo.Collection('classrooms');

export const Methods = {
  insert({ name, description, ratio }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const createdBy = Meteor.user();
    const parsedRatio = parseInt(ratio);

    new SimpleSchema({
      name: {
        type: String,
        optional: false,
        min: 1,
      },
      description: {
        type: String,
        optional: false,
        min: 1,
      },
      ratio: {
        type: SimpleSchema.Integer,
        optional: false,
        min: 0,
      },
      teachers: {
        type: Array,
        optional: true,
      },
      'teachers.$': {
          type: String
      },
    }).validate({ name, description, ratio: parsedRatio });

    return Classrooms.insert({
      name,
      description,
      ratio: parsedRatio,
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

    Classrooms.remove({ _id });
  },
  update(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const name = updates.name;
    const description = updates.description;
    const ratio = parseInt(updates.ratio);

    // TODO: Extract this and have just one validator?
    new SimpleSchema({
      _id: {
        type: String,
        optional: false,
        min: 1,
      },
      name: {
        type: String,
        optional: false,
        min: 1,
      },
      description: {
        type: String,
        optional: false,
        min: 1,
      },
      ratio: {
        type: SimpleSchema.Integer,
        optional: false,
        min: 0,
      }
    }).validate({ _id, name, description, ratio });

    Classrooms.update({ _id }, {
      $set: { updatedAt: moment().valueOf(), name, description, ratio }
    })
  }
}

if (Meteor.isServer) {
  Meteor.publish('classrooms.all', function () {
    if (!this.userId) {
      return [];
    }
    return Classrooms.find();
  });
}

Meteor.methods({
  'classrooms.insert': Methods.insert,
  'classrooms.remove': Methods.remove,
  'classrooms.update': Methods.update,
});
