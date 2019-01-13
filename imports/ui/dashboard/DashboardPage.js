import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Classrooms } from '../../api/classrooms';
import { Teachers } from '../../api/teachers';

export class DashboardPage extends React.Component {
  render() {
    const { classrooms, teachers } = this.props;
    return (
      <div className="page">
        {classrooms.map(classroom => (
          <div key={classroom._id}>
            <h4>{classroom.name}</h4>
            <h5>{classroom.description}</h5>
            <p>Ratio: {classroom.ratio}</p>
          </div>
        ))
        }
        <div>
          <h4>Unassigned teachers</h4>
          {teachers.filter(teacher => !teacher.classroom_id).map(teacher => (
            <div key={teacher._id}>
              <p>{`${teacher.firstName} ${teacher.lastName}`}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  classrooms: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  // meteorCall: PropTypes.func.isRequired,
}

export const DashboardPageContainer = withTracker(() => {
  const handleClassrooms = Meteor.subscribe('classrooms.all');
  const handleTeachers = Meteor.subscribe('teachers.all');
  return {
    // TODO: Join classrooms and teachers here or in render?
    classrooms: Classrooms.find().fetch(),
    teachers: Teachers.find().fetch(),
    loading: !handleClassrooms.ready() && !handleTeachers.ready(),
    // meteorCall: Meteor.call,
  };
})(DashboardPage);
