import React from 'react';
import _ from 'lodash';

import TeacherDrag from './dragdropteacher/Dragteacher'
import ClassroomDrop from './dragdropteacher/Dropclassroom'

export class DashboardTeachersNotAssigned extends React.Component {

  constructor(props) {
    super(props);
    // this.state = { enableRecordingTrajectory: false }
  }

  // renderTeachersNotAssigned(teachersNotAssigned){
  //   return _.map(Object.keys(teachersNotAssigned), key => {
  //     return (
  //       <TeacherDrag
  //         text={this.props.teachers[key].name}
  //         key={key}
  //         teacherId={key}
  //         recording={this.state.enableRecordingTrajectory}
  //       />
  //     )
  //   })
  // }

  render() {

    // const { teachersnotassigned, teachers } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12 m-t">
          <div className="ibox-content">
            <h3>Teachers having a break</h3>
            <ul className="sortable-list connectList agile-list ui-sortable">
              <li>dsd</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

//  default DashboardTeachersNotAssigned;
