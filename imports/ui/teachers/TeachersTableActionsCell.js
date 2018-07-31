import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../common/modals/Modal';
import { FormModal } from '../common/modals/FormModal';
import { TeacherForm, validate } from './TeacherForm';

import 'react-table/react-table.css';

export class TeachersTableActionsCell extends React.Component {
  render() {
    const { row, deleteTeacher, editTeacher } = this.props;
    return (
      <div className="row__actions">
        <FormModal
          buttonText="Edit"
          successButtonText="Edit"
          cancelButtonText="Cancel"
          title="Edit teacher"
          triggerStyle="success"
          primaryStyle="success"
          initialValues={row.original}
          onSubmit={editTeacher}
          validate={validate}
          render={TeacherForm} />
        <Modal
          buttonText="Delete"
          successButtonText="Delete"
          cancelButtonText="Cancel"
          title="Delete teacher"
          triggerStyle="danger"
          primaryStyle="danger"
          onSuccess={() => deleteTeacher(row.original._id)}>
          {`Are you sure you want to delete the teacher ${row.original.firstName} ${row.original.lastName}`}
        </Modal>
      </div>
    );
  }
}

TeachersTableActionsCell.propTypes = {
  row: PropTypes.object.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
  editTeacher: PropTypes.func.isRequired,
}
