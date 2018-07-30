import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';

export class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onSuccess() {
    this.props.onSuccess();
    this.closeModal();
  }

  render() {
    const { children, buttonText, cancelButtonText, successButtonText, title, onCancel, triggerStyle, primaryStyle } = this.props;
    return (
      <div>
        <Button bsStyle={triggerStyle} onClick={this.openModal}>{buttonText}</Button>
        <BootstrapModal
          show={this.state.modalIsOpen}
          onHide={this.closeModal}
        >
          <BootstrapModal.Header closeButton>
            <BootstrapModal.Title id="contained-modal-title-lg">
              {title}
            </BootstrapModal.Title>
          </BootstrapModal.Header>
          <BootstrapModal.Body>
            {children}
          </BootstrapModal.Body>
          <BootstrapModal.Footer>
            <Button onClick={onCancel ? onCancel : this.closeModal}>{cancelButtonText}</Button>
            <Button type="submit" bsStyle={primaryStyle} onClick={this.onSuccess}>{successButtonText}</Button>
          </BootstrapModal.Footer>
        </BootstrapModal>
      </div>
    );
  }
}

Modal.defaultProps = {
  cancelButtonText: 'Close',
  successButtonText: 'Save',
  primaryStyle: 'primary',
  triggerStyle: 'primary',
}

Modal.propTypes = {
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string,
  successButtonText: PropTypes.string,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  primaryStyle: PropTypes.string,
  triggerStyle: PropTypes.string,
}