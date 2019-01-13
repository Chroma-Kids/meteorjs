import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Classrooms } from '../../api/classrooms';
import { Teachers } from '../../api/teachers';
import { TeachersNotAssigned } from '../../api/teachers-not-assigned';
import { Link } from 'react-router-dom';
import ToolbarDashboard from '../common/ToolbarDashboard'
import DashboardTeachersNotAssigned from './DashboardTeachersNotAssigned'
import DashboardClassrooms from './DashboardClassrooms'

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enableRecordingTrajectory: false }
  }

  toggleMenu(){
    this.setState({
      enableRecordingTrajectory: !this.state.enableRecordingTrajectory
    });
  }


  render() {

    const { enableRecordingTrajectory } = this.state;

    return (
      <div key="homeView">

        <ToolbarDashboard
          button={this.toggleMenu.bind(this)}
          buttonText={(this.state.enableRecordingTrajectory ? "Recording..." : "Testing")}
          title={"Dashboard"} />

        <DashboardTeachersNotAssigned
          {...this.props}
        />
        <DashboardClassrooms
            {...this.props}
            enableRecordingTrajectory={enableRecordingTrajectory}
          />
      </div>);
  }
}

DashboardPage.propTypes = {
  classrooms: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired,
  teachersNotAssigned: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  // meteorCall: PropTypes.func.isRequired,
}

export const DashboardPageContainer = withTracker(() => {
  const handleClassrooms = Meteor.subscribe('classrooms.all');
  const handleTeachers = Meteor.subscribe('teachers.all');
  const handleTeachersNotAssigned = Meteor.subscribe('teachers-not-assigned.all');
  return {
    // TODO: Join classrooms and teachers here or in render?
    classrooms: Classrooms.find().fetch(),
    teachers: Teachers.find().fetch(),
    teachersNotAssigned: TeachersNotAssigned.find().fetch(),
    loading: !handleClassrooms.ready() && !handleTeachers.ready(),
    // meteorCall: Meteor.call,
  };
})(DashboardPage);
