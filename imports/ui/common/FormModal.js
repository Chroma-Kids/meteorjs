import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';
import { Form } from 'react-final-form';

export class FormModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal(form) {
    this.setState({ modalIsOpen: false });
    if (form && form.reset) { form.reset(); }
  }

  onSubmit(form, submit) {
    const result = submit();
    if (result) {
      result
        .then(() => {
          this.closeModal();
          if (form && form.reset) { form.reset(); }
        });
    }
  }

  render() {
    const {
      onSubmit,
      initialValues,
      validate,
      render,
      buttonText,
      cancelButtonText,
      successButtonText,
      title,
      triggerStyle,
      primaryStyle } = this.props;
    return (
      <div>
        <button className="btn btn-success btn-sm" onClick={() => this.openModal()}>{buttonText}</button>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={validate}
          render={({ handleSubmit, pristine, submitError, submitting, hasValidationErrors, form }) => (
            <BootstrapModal
              show={this.state.modalIsOpen}
              onHide={this.closeModal}
            >
              <form onSubmit={handleSubmit}>
                <BootstrapModal.Header closeButton>
                  <BootstrapModal.Title id="contained-modal-title-lg">
                    {title}
                  </BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>
                  {render({ handleSubmit, pristine, submitError, submitting, hasValidationErrors })}
                </BootstrapModal.Body>
                <BootstrapModal.Footer>
                  <Button onClick={() => this.closeModal(form)}>{cancelButtonText}</Button>
                  <Button type="submit" bsStyle={primaryStyle} disabled={pristine || hasValidationErrors || submitting} onClick={() => this.onSubmit(form, handleSubmit)}>{successButtonText}</Button>
                </BootstrapModal.Footer>
              </form>
            </BootstrapModal>
          )} />
      </div>
    );
  }
}

FormModal.defaultProps = {
  cancelButtonText: 'Close',
  successButtonText: 'Save',
  primaryStyle: 'primary',
  triggerStyle: 'primary',
}

FormModal.propTypes = {
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string,
  successButtonText: PropTypes.string,
  primaryStyle: PropTypes.string,
  triggerStyle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  validate: PropTypes.func,
  render: PropTypes.func.isRequired,
}
