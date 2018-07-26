import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { StudentForm, validate } from './StudentForm';
import { withTracker } from 'meteor/react-meteor-data';

export class AddStudent extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, form, callback) {
    this.props.meteorCall('students.insert', values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={StudentForm} />
      </div>
    );
  }
}

AddStudent.propTypes = {
  meteorCall: PropTypes.func.isRequired,
}

export const AddStudentContainer = withTracker(() => {
  return {
    meteorCall: Meteor.call,
  };
})(AddStudent);