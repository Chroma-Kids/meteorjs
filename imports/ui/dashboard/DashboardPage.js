import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Classrooms } from '../../api/classrooms';
import { Teachers } from '../../api/teachers';
import { Link } from 'react-router-dom';
import ClassroomDrop from './dragdropteacher/Dropclassroom'
import TeacherDrag from './dragdropteacher/Dragteacher'
import ToolbarDashboard from '../common/ToolbarDashboard'
import DashboardTeachersNotAssigned from './DashboardTeachersNotAssigned'

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

  renderTeachersClassroom(teachersKey, classroomKey){
    return _.map(Object.keys(teachersKey), key => {
      return (
        <TeacherDrag
          text={this.props.teachers[key].name}
          key={key}
          teacherId={key}
          classroomId={classroomKey}
          recording={this.props.enableRecordingTrajectory}
        />
      )
    })
  }

  renderClassrooms(){
      return _.map(this.props.classrooms, (classroom, key) => {

        let ratio = 1 / classroom.ratio;
        let ratio_real = classroom.num_teachers / classroom.num_students;
        let ratio_spare = ratio + 0.20;

        return (
            <div className="col-lg-3 p-r-none" key={key}>
              <div className="ibox">
                  <div className="ibox-content">
                      <h3>
                      <Link to=''>{ classroom.name }</Link>
                      {(ratio > ratio_real ? <span className="label label-danger m-l">Teacher needed</span> : null)}
                      {(ratio_real > ratio_spare && classroom.num_teachers > 1 ? <span className="label label-primary m-l">Spare teacher</span> : null)}
                      </h3>
                      <p className="small"><i className="fa fa-hand-o-up"></i> Add here a toolbar for the classroom.
                      For instance creating incidents for this classroom direclty.</p>
                      <p className="small"><i className="fa fa-hand-o-up"></i> Drag teachers between classrooms</p>

                      {/*<div className="input-group">
                          <input type="text" placeholder="Add new teacher " className="input input-sm form-control"/>
                          <span className="input-group-btn">
                                  <button type="button" className="btn btn-sm btn-white"> <i className="fa fa-plus"></i> Add teacher</button>
                          </span>
                      </div>*/}

                      <ClassroomDrop classroomId={key}>
                        console.log(classroom)
                      </ClassroomDrop>
                  </div>
              </div>
          </div>)
      });

    }

  render() {

    return (
      <div key="homeView">

        <ToolbarDashboard
          button={this.toggleMenu.bind(this)}
          buttonText={(this.state.enableRecordingTrajectory ? "Recording..." : "Testing")}
          title={"Dashboard"} />

        <DashboardTeachersNotAssigned
          {...this.props}
        />

        <div className="row">
          {
            (typeof this.props.teachers !== "undefined"
            && typeof this.props.classrooms !== "undefined"
            && this.props.classrooms != null
            ?
              this.renderClassrooms()
            :
            <div className="col-lg-12 m-t">
              <div className="ibox-content">
                <div className="alert alert-warning m">You must create some classrooms first</div>
              </div>
            </div>
          )}
        </div>
      </div>);
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
