import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Classrooms } from '../../api/classrooms';
import { Teachers } from '../../api/teachers';
import { Toolbar } from '../common/Toolbar';
import { DashboardTeachersNotAssigned } from './DashboardTeachersNotAssigned'
import { DashboardClassrooms } from './DashboardClassrooms'

export class DashboardPage extends React.Component {
  render() {
    const { classrooms, teachers, title, buttonText } = this.props;
    return (
      <div key="homeView">

        <Toolbar
          title={"Dashboard"}
          breadcrumb={['']}
          button={this.openModal}
          buttonText={buttonText} />

        <DashboardTeachersNotAssigned
          {...this.props}
        />

        <DashboardClassrooms
          {...this.props}
        />

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
