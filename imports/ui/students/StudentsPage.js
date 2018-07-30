import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/students';
import { AddStudent } from './AddStudent';
import { Modal } from '../common/Modal';

import 'react-table/react-table.css';
import { StudentsTable } from './StudentsTable';

export class StudentsPage extends React.Component {

  constructor(props) {
    super(props);
    this.addStudent = this.addStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
  }

  addStudent(values, form, callback) {
    this.props.meteorCall('students.insert', values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  editStudent(values, form, callback) {
    this.props.meteorCall('students.update', values._id, values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  deleteStudent(id) {
    this.props.meteorCall('students.remove', id);
  }

  render() {
    const { students, loading } = this.props;

    if (loading) {
      return (<h1>Loading...</h1>);
    }

    return (
      <div className="page">
        <div className="page__header">
          <h1>Students</h1>
          <Modal buttonText="New Student" title="Create a new student">
            <AddStudent onSubmit={this.addStudent} />
          </Modal>
        </div>
        <StudentsTable students={students} deleteStudent={this.deleteStudent} editStudent={this.editStudent} />
      </div>
    );
  }
}

StudentsPage.propTypes = {
  students: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  meteorCall: PropTypes.func.isRequired,
}

export const StudentsPageContainer = withTracker(() => {
  const handle = Meteor.subscribe('students.all');
  return {
    students: Students.find({}, { sort: { firstName: 1 } }).fetch(),
    loading: !handle.ready(),
    meteorCall: Meteor.call,
  };
})(StudentsPage);