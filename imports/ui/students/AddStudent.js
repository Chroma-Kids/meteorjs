import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { StudentForm, validate } from './StudentForm';

export class AddStudent extends React.Component {

  render() {
    const { onSubmit, initialValues } = this.props;
    return (
      <div>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={validate}
          render={StudentForm} />
      </div>
    );
  }
}

AddStudent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
}
