import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Modal } from '../common/Modal';
import { AddStudent } from './AddStudent';

import 'react-table/react-table.css';

class StudentsTableActionsCell extends React.Component {
  render() {
    const { row, deleteStudent, editStudent } = this.props;
    return (
      <div className="row__actions">
        <Modal buttonText="Edit" successButtonText="Edit" cancelButtonText="Cancel" title="Edit student" triggerStyle="success" primaryStyle="success" onSuccess={() => { }}>
          <AddStudent onSubmit={editStudent} initialValues={row.original} />
        </Modal>
        <Modal buttonText="Delete" successButtonText="Delete" cancelButtonText="Cancel" title="Delete student" triggerStyle="danger" primaryStyle="danger" onSuccess={() => deleteStudent(row.original._id)}>
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

export class StudentsTable extends React.Component {

  columns = [
    {
      Header: 'First Name',
      accessor: 'firstName'
    },
    {
      Header: 'Last Name',
      accessor: 'lastName'
    },
    {
      Header: 'Actions',
      Cell: row => <StudentsTableActionsCell row={row} deleteStudent={this.props.deleteStudent} editStudent={this.props.editStudent} />,
    }
  ];

  render() {
    const { students } = this.props;

    return (
      <div>
        <ReactTable
          data={students}
          columns={this.columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

StudentsTable.propTypes = {
  students: PropTypes.array.isRequired,
  deleteStudent: PropTypes.func.isRequired,
}
