import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Classrooms } from '../../api/classrooms';
import { ClassroomsTable } from './ClassroomsTable';
import { FormModal } from '../common/modals/FormModal';
import { ClassroomForm, validate } from './ClassroomForm';

import 'react-table/react-table.css';

export class ClassroomsPage extends React.Component {

  constructor(props) {
    super(props);
    this.addClassroom = this.addClassroom.bind(this);
    this.deleteClassroom = this.deleteClassroom.bind(this);
    this.editClassroom = this.editClassroom.bind(this);
  }

  addClassroom(values, form, callback) {
    this.props.meteorCall('classrooms.insert', values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  // TODO: Merge add and edit?
  editClassroom(values, form, callback) {
    this.props.meteorCall('classrooms.update', values._id, values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  deleteClassroom(id) {
    this.props.meteorCall('classrooms.remove', id);
  }

  render() {
    const { classrooms, loading } = this.props;

    if (loading) {
      return (<h1>Loading...</h1>);
    }

    return (
      <div className="page">
        <div className="page__header">
          <h1>Classroom</h1>
          <FormModal
            buttonText="New Classroom"
            title="Create a new classroom"
            onSubmit={this.addClassroom}
            validate={validate}
            render={ClassroomForm} />
        </div>
        <ClassroomsTable classrooms={classrooms} deleteClassroom={this.deleteClassroom} editClassroom={this.editClassroom} />
      </div>
    );
  }
}

ClassroomsPage.propTypes = {
  classrooms: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  meteorCall: PropTypes.func.isRequired,
}

export const ClassroomsPageContainer = withTracker(() => {
  const handle = Meteor.subscribe('classrooms.all');
  return {
    classrooms: Classrooms.find({}, { sort: { name: 1 } }).fetch(),
    loading: !handle.ready(),
    meteorCall: Meteor.call,
  };
})(ClassroomsPage);
