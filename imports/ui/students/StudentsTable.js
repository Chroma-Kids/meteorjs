import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { StudentsTableActionsCell } from './StudentsTableActionsCell';

import 'react-table/react-table.css';

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
