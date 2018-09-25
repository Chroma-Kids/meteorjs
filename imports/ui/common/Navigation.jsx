// import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import { Image, Button } from 'react-bootstrap';
//
// export class SideNav extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.goTo = this.goTo.bind(this);
//   }
//
//   goTo(route) {
//     const { history } = this.props;
//     history.push(route);
//   }
//
//   render() {
//     return (
//       <div className="sidenav">
//         <div className="sidenav__logo">
//           <Image circle src="https://avatars1.githubusercontent.com/u/36645050?s=400&u=f066466975cea18902ef337a14e4abb39aaf7a73&v=4" />
//         </div>
//         <div className="sidenav__menu">
//           <Button bsStyle="link" block onClick={() => this.goTo('/dashboard')}><i className="fas fa-home"></i>Dashboard</Button>
//           <Button bsStyle="link" block onClick={() => this.goTo('/classrooms')}><i className="fas fa-users"></i>Classrooms</Button>
//           <Button bsStyle="link" block onClick={() => this.goTo('/teachers')}><i className="fas fa-chalkboard-teacher"></i>Teachers</Button>
//           <Button bsStyle="link" block onClick={() => this.goTo('/students')}><i className="fas fa-graduation-cap"></i>Students</Button>
//         </div>
//       </div>
//     );
//   }
// }
//
// SideNav.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }),
// };
//
// export const SideNavContainer = withRouter(SideNav);



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
            <Link to="/dashboard"><i className="fa fa-th-large"></i> <span className="nav-label">Dashboard</span></Link>
          </li>
          <li className={activeRoute(location, "class")}>
            <Link to="/classrooms"><i className="fa fa-th-large"></i> <span className="nav-label">Classrooms</span></Link>
          </li>
          <li className={activeRoute(location, "teacher")} >
              <Link to="/teachers"><i className="fa fa-th-large"></i> <span className="nav-label">Teachers</span></Link>
          </li>
          <li className={activeRoute(location, "student")} >
              <Link to="/students"><i className="fa fa-th-large"></i> <span className="nav-label">Students</span></Link>
          </li>
      </ul>
    </nav>
  );
};

function mapStateToProps(state, ownProps) {
  return { user: state.user.user };
}

// export default connect(mapStateToProps, null)(NavigationBar);
