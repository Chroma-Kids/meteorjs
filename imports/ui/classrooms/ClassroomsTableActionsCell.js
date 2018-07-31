import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../common/modals/Modal';
import { FormModal } from '../common/modals/FormModal';
import { ClassroomForm, validate } from './ClassroomForm';

import 'react-table/react-table.css';

export class ClassroomsTableActionsCell extends React.Component {
  render() {
    const { row, deleteClassroom, editClassroom } = this.props;
    return (
      <div className="row__actions">
        <FormModal
          buttonText="Edit"
          successButtonText="Edit"
          cancelButtonText="Cancel"
          title="Edit classroom"
          triggerStyle="success"
          primaryStyle="success"
          initialValues={row.original}
          onSubmit={editClassroom}
          validate={validate}
          render={ClassroomForm} />
        <Modal
          buttonText="Delete"
          successButtonText="Delete"
          cancelButtonText="Cancel"
          title="Delete classroom"
          triggerStyle="danger"
          primaryStyle="danger"
          onSuccess={() => deleteClassroom(row.original._id)}>
          {`Are you sure you want to delete the classroom ${row.original.name}`}
        </Modal>
      </div>
    );
  }
}

ClassroomsTableActionsCell.propTypes = {
  row: PropTypes.object.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
  editClassroom: PropTypes.func.isRequired,
}
