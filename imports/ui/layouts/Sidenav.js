import React from 'react';
import { Image, Button } from 'react-bootstrap';

export class SideNav extends React.Component {
  render() {
    return (
      <div className="sidenav">
        <div className="sidenav__logo">
          <Image circle src="https://avatars1.githubusercontent.com/u/36645050?s=400&u=f066466975cea18902ef337a14e4abb39aaf7a73&v=4" />
        </div>
        <div className="sidenav__menu">
          <Button bsStyle="link" block><i className="fas fa-home"></i>Dashboard</Button>
          <Button bsStyle="link" block><i className="fas fa-users"></i>Classes</Button>
          <Button bsStyle="link" block><i className="fas fa-chalkboard-teacher"></i>Teachers</Button>
          <Button bsStyle="link" block><i className="fas fa-graduation-cap"></i>Students</Button>
        </div>
      </div>
    );
  }
}
