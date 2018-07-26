import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

export class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      appElement: document.getElementById('app'),
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { children, buttonText } = this.props;
    return (
      <div>
        <button onClick={this.openModal}>{buttonText}</button>
        <ReactModal
          appElement={this.state.appElement}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          {children}
        </ReactModal>
      </div>
    );
  }
}

Modal.propTypes = {
  buttonText: PropTypes.string.isRequired,
}