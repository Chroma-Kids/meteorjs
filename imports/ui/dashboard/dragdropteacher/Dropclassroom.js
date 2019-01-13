// Let's make <ClassroomDrop text='Write the docs' /> draggable!

import React from 'react';
// import PropTypes from 'prop-types';
// import { DropTarget } from 'react-dnd';
// import { connect } from 'react-redux';
// import flow from 'lodash/flow'

// import { moveTeacherToClassroom } from '../../redux/actions/TeacherActions';

// const Types = {
//   TEACHER: 'teacher'
// };

/**
 * Implements the drag source contract.
 */
//  const listTarget = {
//    drop(props, source) {
//       props.moveTeacherToClassroom(source.getItem().teacherId, source.getItem().classroomId, props.classroomId, source.getItem().recording);

//       // // if (source.getItem().recording) {
//       //   props.addTrajectory(source.getItem().teacherId, props.classroomId)
//       // // }
//    }
//  };

/**
 * Specifies the props to inject into your component.
 */
//  function collect(connect, monitor) {
//    return {
//      connectDropTarget: connect.dropTarget(),
//      isOver: monitor.isOver()
//    };
//  }

// const propTypes = {
//   // Injected by React DnD:
//   connectDropTarget: PropTypes.func.isRequired,
//   isOver: PropTypes.bool.isRequired
// };

export class ClassroomDrop extends React.Component {

  // moveTeacherToClassroom(values, form, callback) {
  //   this.props.meteorCall('teachers.moveTeacherToClassroom', values._id, values, (err) => {
  //     if (err) {
  //       callback({ [err.reason.name]: err.reason.message });
  //     } else {
  //       callback();
  //     }
  //   });
  // }

  render() {
    // const { connectDropTarget, children, classroomId } = this.props;

    return (
      <ul className="sortable-list connectList agile-list ui-sortable" id={classroomId}>
        <li>dsd</li>
      </ul>
    );
  }
}

// ClassroomDrop.propTypes = propTypes;


// export default flow(
//   DropTarget(Types.TEACHER, listTarget, collect),
//   // connect(null, { moveTeacherToClassroom })
// )(ClassroomDrop);
