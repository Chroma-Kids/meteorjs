import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../common/modals/Modal';
import { FormModal } from '../common/modals/FormModal';
import { StudentForm, validate } from '../students/StudentForm';

import 'react-table/react-table.css';

export class StudentsTableActionsCell extends React.Component {
  render() {
    const { row, deleteStudent, editStudent } = this.props;
    return (
      <div className="row__actions">
        <FormModal
          buttonText="Edit"
          successButtonText="Edit"
          cancelButtonText="Cancel"
          title="Edit student"
          triggerStyle="success"
          primaryStyle="success"
          initialValues={row.original}
          onSubmit={editStudent}
          validate={validate}
          render={StudentForm} />
        <Modal
          buttonText="Delete"
          successButtonText="Delete"
          cancelButtonText="Cancel"
          title="Delete student"
          triggerStyle="danger"
          primaryStyle="danger"
          onSuccess={() => deleteStudent(row.original._id)}>
          {`Are you sure you want to delete the student ${row.original.firstName} ${row.original.lastName}`}
        </Modal>
      </div>
    );
  }
}

StudentsTableActionsCell.propTypes = {
  row: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
}
