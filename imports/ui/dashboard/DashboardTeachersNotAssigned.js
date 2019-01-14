import React from 'react';
import _ from 'lodash';

import TeacherDrag from './dragdropteacher/Dragteacher'
import ClassroomDrop from './dragdropteacher/Dropclassroom'

class DashboardTeachersNotAssigned extends React.Component {

  constructor(props) {
    super(props);
    this.state = { enableRecordingTrajectory: false }
  }

  renderTeachersNotAssigned(teachersNotAssigned, teachers){

    // console.log(Object.values(teachersNotAssigned));
    // console.log(teachersNotAssigned);

    for (var variable in teachersNotAssigned) {
        console.log(variable);
    }

    // return _.map(Object.values(teachersNotAssigned), (teacher, key) =>
    //   <TeacherDrag
    //     text={teachers[teacher.teacherId].firstName}
    //     key={key}
    //     teacherId={key}
    //   />
    // )
  }

  render() {

    const { teachersNotAssigned, teachers } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12 m-t">
          <div className="ibox-content">
            <h3>Teachers having a break</h3>
            <ClassroomDrop className="alert alert-info m-n">
              {
                (typeof teachers !== "undefined" &&
                typeof teachersNotAssigned !== "undefined" &&
                teachersNotAssigned != null
                ?
                  this.renderTeachersNotAssigned(teachersNotAssigned, teachers)
                :
                <div className="alert alert-warning m-n">No teachers having a break.</div>
              )}
            </ClassroomDrop>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardTeachersNotAssigned;
