import React from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp'
import { FormModal } from '../common/FormModal';
import { TeacherForm, validate } from './TeacherForm';

export const ListItemTeacher = (props) => {

  const { teacher, itemKey, deleteTeacher, editTeacher } = props;

  return (
    <tr key={itemKey}>
      <td className="project-status">
        <span className="label label-primary">Active</span>
      </td>
      <td className="project-title">
        <Link to={'ddds'}>{teacher.firstName} {teacher.lastName}</Link>
        <br />
        <small>Created <Timestamp time={teacher.created_at} format='ago' actualSeconds autoUpdate /></small>
      </td>
      <td className="project-completion">
        <small>Completion with: 28%</small>
        <div className="progress progress-mini">
          <div className="progress-bar"></div>
        </div>
      </td>
      <td className="project-people">
        {/*(!!classrooms && typeof teacher.classrooms !== "undefined" ?
            Object.keys(teacher.classrooms).map(key => {
              return <Link key={key} to={'ssdd'}><img alt={classrooms[key].name} className="img-circle"/></Link>;
            })
            :
            <div className="alert alert-warning m-b-none">
                teacher not assigned to a classroom
            </div>
          )*/}
      </td>
      <td className="project-actions">
        <FormModal
          buttonText="Edit"
          successButtonText="Edit"
          cancelButtonText="Cancel"
          title="Edit teacher"
          triggerStyle="success"
          primaryStyle="success"
          initialValues={teacher}
          onSubmit={editTeacher}
          validate={validate}
          render={TeacherForm} />
        <button onClick={() => {
          deleteTeacher(teacher._id)
        }} className="btn btn-danger btn-sm"><i className="fa fa-cross"></i> Delete </button>
      </td>
    </tr>
  )
}
