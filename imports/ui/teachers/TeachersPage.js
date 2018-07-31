import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Teachers } from '../../api/teachers';
import { TeachersTable } from './TeachersTable';
import { FormModal } from '../common/modals/FormModal';
import { TeacherForm, validate } from './TeacherForm';

import 'react-table/react-table.css';

export class TeachersPage extends React.Component {

  constructor(props) {
    super(props);
    this.addTeacher = this.addTeacher.bind(this);
    this.deleteTeacher = this.deleteTeacher.bind(this);
    this.editTeacher = this.editTeacher.bind(this);
  }

  addTeacher(values, form, callback) {
    this.props.meteorCall('teachers.insert', values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  // TODO: Merge add and edit?
  editTeacher(values, form, callback) {
    this.props.meteorCall('teachers.update', values._id, values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  deleteTeacher(id) {
    this.props.meteorCall('teachers.remove', id);
  }

  render() {
    const { teachers, loading } = this.props;

    if (loading) {
      return (<h1>Loading...</h1>);
    }

    return (
      <div className="page">
        <div className="page__header">
          <h1>Teachers</h1>
          <FormModal
            buttonText="New Teacher"
            title="Create a new teacher"
            onSubmit={this.addTeacher}
            validate={validate}
            render={TeacherForm} />
        </div>
        <TeachersTable teachers={teachers} deleteTeacher={this.deleteTeacher} editTeacher={this.editTeacher} />
      </div>
    );
  }
}

TeachersPage.propTypes = {
  teachers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  meteorCall: PropTypes.func.isRequired,
}

export const TeachersPageContainer = withTracker(() => {
  const handle = Meteor.subscribe('teachers.all');
  return {
    teachers: Teachers.find({}, { sort: { firstName: 1 } }).fetch(),
    loading: !handle.ready(),
    meteorCall: Meteor.call,
  };
})(TeachersPage);
