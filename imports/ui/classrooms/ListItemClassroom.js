import React from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp'

export const ListItemClassroom = (props) => {

  const { classroom, itemKey, deleteClassroom } = props;

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
            <Link to={'sd'} className="btn btn-success btn-sm"><i className="fa fa-cross"></i> Edit </Link>
            <button onClick={() => {
              deleteClassroom(itemKey)
            }} className="btn btn-danger btn-sm"><i className="fa fa-cross"></i> Delete </button>
        </td>
    </tr>
  )
}
