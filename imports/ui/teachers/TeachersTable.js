import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { TeachersTableActionsCell } from './TeachersTableActionsCell';

import 'react-table/react-table.css';

export class TeachersTable extends React.Component {

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
      Cell: row => <TeachersTableActionsCell row={row} deleteTeacher={this.props.deleteTeacher} editTeacher={this.props.editTeacher} />,
    }
  ];

  render() {
    const { teachers } = this.props;

    return (
      <div>
        <ReactTable
          data={teachers}
          columns={this.columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

TeachersTable.propTypes = {
  teachers: PropTypes.array.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
}
