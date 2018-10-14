import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Classrooms } from '../../api/classrooms';
import { ClassroomsTable } from './ClassroomsTable';
import { FormModal } from '../common/modals/FormModal';
import { Toolbar } from '../common/Toolbar';
import { List } from '../common/List';
import { ListItemClassroom } from './ListItemClassroom';
import { ClassroomForm, validate } from './ClassroomForm';

import 'react-table/react-table.css';

export class ClassroomsPage extends React.Component {

  constructor(props) {
    super(props);
    this.addClassroom = this.addClassroom.bind(this);
    this.deleteClassroom = this.deleteClassroom.bind(this);
    this.editClassroom = this.editClassroom.bind(this);

    this.state = { showPopup: false }

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

  toggleMenu(){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    const { classrooms, loading } = this.props;

    return (
      <div key="homeView">
        <FormModal
          buttonText="New Classroom"
          title="Classrooms"
          onSubmit={this.addClassroom}
          validate={validate}
          render={ClassroomForm} />

        {(loading ?
          <div className="spiner-example">
              <div className="sk-spinner sk-spinner-double-bounce">
                  <div className="sk-double-bounce1"></div>
                  <div className="sk-double-bounce2"></div>
              </div>
          </div>
          :
          <List {...this.props} className={ "classrooms" } >
           {_.map(classrooms, (classroom, key) =>
               <ListItemClassroom {...this.props} key={key} itemKey={key} classroom={classroom} editClassroom={this.editClassroom} deleteClassroom={this.deleteClassroom}  />
            )}
          </List>
        )}
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
