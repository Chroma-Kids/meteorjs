import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactTable from "react-table";
import { Students } from '../../api/students';
import { AddStudentContainer as AddStudent } from './AddStudent';
import { Modal } from '../common/Modal';

import 'react-table/react-table.css';

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName'
  }
];

export class StudentsPage extends React.Component {
  render() {
    let submit;
    const { students, loading } = this.props;

    if (loading) {
      return (<h1>Loading...</h1>);
    }

    return (
      <div className="page">
        <div className="page__header">
          <h1>Students</h1>
          <Modal buttonText="New Student" title="Create a new student">
            <AddStudent />
          </Modal>
        </div>
        <div>
          <ReactTable
            data={students}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}

StudentsPage.propTypes = {
  students: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export const StudentsPageContainer = withTracker(() => {
  const handle = Meteor.subscribe('students.all');
  return {
    students: Students.find({}, { sort: { firstName: 1 } }).fetch(),
    loading: !handle.ready(),
  };
})(StudentsPage);