import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Field as FinalFormField } from 'react-final-form';

function hasError(meta) {
  return (meta.error || meta.submitError) && meta.touched;
}

export class Field extends React.Component {
  render() {
    const { name, type, placeholder } = this.props;
    return (
      <FinalFormField name={name}>
        {({ input, meta }) => (
          <div>
            <FormGroup validationState={hasError(meta) ? "error" : null}>
              <FormControl {...input} type={type} placeholder={placeholder} />
              {hasError(meta) && <span className="form__field--error">{meta.error || meta.submitError}</span>}
            </FormGroup>
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
