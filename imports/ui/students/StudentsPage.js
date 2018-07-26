import React from 'react';
import PropTypes from 'prop-types';
import { AddStudentContainer as AddStudent } from './AddStudent';
import { Modal } from '../common/Modal';

export class StudentsPage extends React.Component {

  render() {
    return (
      <div>
        <Modal buttonText="New Student">
          <AddStudent />
        </Modal>
      </div>
    );
  }
}

StudentsPage.propTypes = {

}