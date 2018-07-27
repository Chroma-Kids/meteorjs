import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/students';
import { AddStudentContainer as AddStudent } from './AddStudent';
import { Modal } from '../common/Modal';

export class StudentsPage extends React.Component {

  render() {
    const { students, loading } = this.props;

    if (loading) {
      return (<h1>Loading...</h1>);
    }

    return (
      <div>
        <Modal buttonText="New Student">
          <AddStudent />
        </Modal>
        <div>
          {students.map(student => <p key={student._id}>{`${student.firstName} ${student.lastName}`}</p>)}
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
    students: Students.find({}, { sort: { firstName: -1 } }).fetch(),
    loading: !handle.ready(),
  };
})(StudentsPage);