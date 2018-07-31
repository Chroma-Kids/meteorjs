import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { ClassroomsTableActionsCell } from './ClassroomsTableActionsCell';

import 'react-table/react-table.css';

export class ClassroomsTable extends React.Component {

  columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Ratio',
      accessor: 'ratio',
    },
    {
      Header: 'Actions',
      Cell: row => <ClassroomsTableActionsCell row={row} deleteClassroom={this.props.deleteClassroom} editClassroom={this.props.editClassroom} />,
    }
  ];

  render() {
    const { classrooms } = this.props;

    return (
      <div>
        <ReactTable
          data={classrooms}
          columns={this.columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

ClassroomsTable.propTypes = {
  classrooms: PropTypes.array.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
}
