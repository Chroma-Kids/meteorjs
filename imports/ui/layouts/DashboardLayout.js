import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Header } from '../Header';
import { SideNavContainer as SideNav } from './Sidenav';

export class DashboardLayout extends React.Component {
  render() {
    return (
      <div>
        <Grid fluid className="dashboard">
          <Col md={2} className="dashboard__sidenav">
            <SideNav />
          </Col>
          <Col md={10} className="dashboard__main">
            <Header />
            <div className="dashboard__content">
              {this.props.children}
            </div>
          </Col>
        </Grid>
      </div>
    );
  }
}
