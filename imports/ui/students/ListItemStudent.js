import React from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp'
import { FormModal } from '../common/FormModal';
import { StudentForm, validate } from './StudentForm';

export const ListItemStudent = (props) => {

  const { student, itemKey, deleteStudent, editStudent } = props;

  return (
    <tr key={itemKey}>
      <td className="project-status">
        <span className="label label-primary">Active</span>
      </td>
      <td className="project-title">
        <Link to={'ddds'}>{student.firstName} {student.lastName}</Link>
        <br />
        <small>Created <Timestamp time={student.created_at} format='ago' actualSeconds autoUpdate /></small>
      </td>
      <td className="project-completion">
        <small>Completion with: 28%</small>
        <div className="progress progress-mini">
          <div className="progress-bar"></div>
        </div>
      </td>
      <td className="project-people">
        {/*(!!classrooms && typeof student.classrooms !== "undefined" ?
            Object.keys(student.classrooms).map(key => {
              return <Link key={key} to={'ssdd'}><img alt={classrooms[key].name} className="img-circle"/></Link>;
            })
            :
            <div className="alert alert-warning m-b-none">
                Student not assigned to a classroom
            </div>
          )*/}
      </td>
      <td className="project-actions">
        <FormModal
          buttonText="Edit"
          successButtonText="Edit"
          cancelButtonText="Cancel"
          title="Edit student"
          triggerStyle="success"
          primaryStyle="success"
          initialValues={student}
          onSubmit={editStudent}
          validate={validate}
          render={StudentForm} />
        <button onClick={() => {
          deleteStudent(student._id)
        }} className="btn btn-danger btn-sm"><i className="fa fa-cross"></i> Delete </button>
      </td>
    </tr>
  )
}
