import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Teachers } from '../../api/teachers';
import { TeachersTable } from './TeachersTable';
import { FormModal } from '../common/modals/FormModal';
import { ListItemTeacher } from './ListItemTeacher';
import { TeacherForm, validate } from './TeacherForm';
import { List } from '../common/List';

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

    return (
      <div key="homeView">
        <FormModal
          buttonText="New Teacher"
          title="Teachers"
          onSubmit={this.addTeacher}
          validate={validate}
          render={TeacherForm} />

        {(loading ?
          <div className="spiner-example">
              <div className="sk-spinner sk-spinner-double-bounce">
                  <div className="sk-double-bounce1"></div>
                  <div className="sk-double-bounce2"></div>
              </div>
          </div>
          :
          <List {...this.props} className={ "students" } >
           {_.map(teachers, (teacher, key) =>
              <ListItemTeacher {...this.props} key={key} itemKey={key} teacher={teacher} editTeacher={this.editTeacher} deleteTeacher={this.deleteTeacher}  />
            )}
          </List>
        )}
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
