import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTracker } from 'meteor/react-meteor-data';
import { StudentForm, validate } from './StudentForm';

export class AddStudent extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  // TODO: This method could be in StudentsPage so this wouldn't need to be a container
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