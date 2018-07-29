import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

export const validateNewUser = (user) => {
  const email = user.emails[0].address;
  const firstName = user.firstName;
  const lastName = user.lastName;

  new SimpleSchema({
    firstName: {
      type: String,
      min: 1,
    },
    lastName: {
      type: String,
      min: 1,
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ firstName, lastName, email });

  return true;
}

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}