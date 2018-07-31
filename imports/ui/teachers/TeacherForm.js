import React from 'react';
import { Field } from '../common/Form/Field';

export function validate(values) {
  const errors = {};

  if (!values.firstName) { errors.firstName = 'Required'; }
  if (!values.lastName) { errors.lastName = 'Required'; }

  return errors;
}

export const TeacherForm = ({ submitError }) => {
  return (
    <React.Fragment>
      {submitError && <div className="error">{submitError}</div>}
      <Field name="firstName" type="text" placeholder="First Name" />
      <Field name="lastName" type="text" placeholder="Last Name" />
    </React.Fragment>
  );
}
