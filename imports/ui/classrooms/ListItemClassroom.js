import React from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp'
import { FormModal } from '../common/FormModal';
import { ClassroomForm, validate } from '../classrooms/ClassroomForm';

export const ListItemClassroom = (props) => {

  const { classroom, itemKey, deleteClassroom, editClassroom } = props;

  return (
    <tr key={itemKey}>
        <td className="project-status">
            <span className="label label-primary"> Ratio {classroom.ratio}</span>
        </td>
        <td className="project-title">
            <Link to={'sd'}>{classroom.name}</Link>
            <br />
            <small>{classroom.description}</small>
        </td>
        <td className="project-title">
            <small>Created <Timestamp time={classroom.created_at} format='ago' actualSeconds autoUpdate /></small>
            <br />
            {( classroom.updated_at != null ?
              <small>Updated <Timestamp time={classroom.updated_at} format='ago' actualSeconds autoUpdate /></small> : null  )}
        </td>
        <td className="project-people">
            <a href=""><img alt="imagecircle" className="img-circle" src="img/a7.jpg"/></a>
            <a href=""><img alt="imagecircle" className="img-circle" src="img/a6.jpg"/></a>
            <a href=""><img alt="imagecircle" className="img-circle" src="img/a3.jpg"/></a>
        </td>

        <td className="project-actions">
          <FormModal
            buttonText="Edit"
            successButtonText="Edit"
            cancelButtonText="Cancel"
            title="Edit classroom"
            triggerStyle="success"
            primaryStyle="success"
            initialValues={classroom}
            onSubmit={editClassroom}
            validate={validate}
            render={ClassroomForm} />

            <button onClick={() => {
              deleteClassroom(classroom._id)
            }} className="btn btn-danger btn-sm"><i className="fa fa-cross"></i> Delete </button>
        </td>
    </tr>
  )
}
