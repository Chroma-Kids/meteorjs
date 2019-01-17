import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/students';
import { StudentsTable } from './StudentsTable';
import { FormModal } from '../common/modals/FormModal';
import { ListItemStudent } from './ListItemStudent';
import { StudentForm, validate } from './StudentForm';
import { List } from '../common/List';

import 'react-table/react-table.css';

export class StudentsPage extends React.Component {

  constructor(props) {
    super(props);
    this.addStudent = this.addStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
  }

  addStudent(values, form, callback) {
    this.props.meteorCall('students.insert', values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  editStudent(values, form, callback) {
    this.props.meteorCall('students.update', values._id, values, (err) => {
      if (err) {
        callback({ [err.reason.name]: err.reason.message });
      } else {
        callback();
      }
    });
  }

  deleteStudent(id) {
    this.props.meteorCall('students.remove', id);
  }

  render() {
    const { students, loading } = this.props;

    return (
      <div key="homeView">
        <FormModal
          buttonText="New Student"
          title="Students"
          onSubmit={this.addStudent}
          validate={validate}
          render={StudentForm} />

        {(loading ?
          <div className="spiner-example">
              <div className="sk-spinner sk-spinner-double-bounce">
                  <div className="sk-double-bounce1"></div>
                  <div className="sk-double-bounce2"></div>
              </div>
          </div>
          :
          <List {...this.props} className={ "students" } >
           {_.map(students, (student, key) =>
              <ListItemStudent {...this.props} key={key} itemKey={key} student={student} editStudent={this.editStudent} deleteStudent={this.deleteStudent}  />
            )}
          </List>
        )}
      </div>
    );
  }
}

StudentsPage.propTypes = {
  students: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  meteorCall: PropTypes.func.isRequired,
}

export const StudentsPageContainer = withTracker(() => {
  const handle = Meteor.subscribe('students.all');
  return {
    students: Students.find({}, { sort: { firstName: 1 } }).fetch(),
    loading: !handle.ready(),
    meteorCall: Meteor.call,
  };
})(StudentsPage);
