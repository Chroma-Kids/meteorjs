import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';

export class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  goTo(route) {
    const { history } = this.props;
    history.push(route);
  }

  render() {
    return (
      <div className="sidenav">
        <div className="sidenav__logo">
          <Image circle src="https://avatars1.githubusercontent.com/u/36645050?s=400&u=f066466975cea18902ef337a14e4abb39aaf7a73&v=4" />
        </div>
        <div className="sidenav__menu">
          <Button bsStyle="link" block onClick={() => this.goTo('/dashboard')}><i className="fas fa-home"></i>Dashboard</Button>
          <Button bsStyle="link" block onClick={() => this.goTo('/classrooms')}><i className="fas fa-users"></i>Classrooms</Button>
          <Button bsStyle="link" block onClick={() => this.goTo('/teachers')}><i className="fas fa-chalkboard-teacher"></i>Teachers</Button>
          <Button bsStyle="link" block onClick={() => this.goTo('/students')}><i className="fas fa-graduation-cap"></i>Students</Button>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export const SideNavContainer = withRouter(SideNav);