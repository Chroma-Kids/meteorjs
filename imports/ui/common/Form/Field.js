import React from 'react';
import PropTypes from 'prop-types';
import { Field as FinalFormField } from 'react-final-form';

export class Field extends React.Component {

  render() {
    const { name, type, placeholder } = this.props;
    return (
      <FinalFormField name={name}>
        {({ input, meta }) => (
          <div>
            <input {...input} type={type} placeholder={placeholder} />
            {(meta.error || meta.submitError) &&
              meta.touched && <span>{meta.error || meta.submitError}</span>}
          </div>
        )}
      </FinalFormField>
    );
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}
