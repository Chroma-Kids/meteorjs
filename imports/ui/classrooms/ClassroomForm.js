import React from 'react';
import { Field } from '../common/Form/Field';

export function validate(values) {
  const errors = {};

  if (!values.name) { errors.name = 'Required'; }
  if (!values.description) { errors.description = 'Required'; }
  if (!values.ratio) { errors.ratio = 'Required'; }
  if (values.ratio < 0) { errors.ratio = 'Ratio must be equal or greater to zero'; }

  return errors;
}

export const ClassroomForm = ({ submitError }) => {
  return (
    <React.Fragment>
      {submitError && <div className="error">{submitError}</div>}
      <Field name="name" type="text" placeholder="Name" />
      <Field name="description" type="text" placeholder="Description" />
      <Field name="ratio" type="text" placeholder="Ratio" /> {/* TODO: Convert to number input */}
    </React.Fragment>
  );
}
