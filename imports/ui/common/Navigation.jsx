import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

export const Navigation = ({
  brand,
  navModel,
  handleLeftNavItemClick,
  handleRightNavItemClick,
  userIsAuthenticated,
  user,
  location
}: Props) => {

  function activeRoute(location, routeName) {
    return '';
      // return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  return (
    <nav className="navbar-default navbar-static-side">
      <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
              <div className="dropdown profile-element"> <span>
                  <img alt="imagecircle" className="img-circle img-nav-profile"  />
               </span>
                  <a data-toggle="dropdown" className="dropdown-toggle">
              <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">{}</strong>
               </span> <span className="text-muted text-xs block">{}</span> </span> </a>
              </div>
              <div className="logo-element">
                  IN+
              </div>
          </li>
          <li className={activeRoute(location, "dashboard")}>
            <Link to="/dashboard">  <span className="nav-label">Dashboard</span></Link>
          </li>
          <li className={activeRoute(location, "class")}>
            <Link to="/classrooms">  <span className="nav-label">Classrooms</span></Link>
          </li>
          <li className={activeRoute(location, "teacher")} >
              <Link to="/teachers">  <span className="nav-label">Teachers</span></Link>
          </li>
          <li className={activeRoute(location, "student")} >
              <Link to="/students">  <span className="nav-label">Students</span></Link>
          </li>
      </ul>
    </nav>
  );
};

function mapStateToProps(state, ownProps) {
  return { user: state.user.user };
}

// export default connect(mapStateToProps, null)(NavigationBar);
