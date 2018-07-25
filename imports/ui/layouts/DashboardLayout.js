import React from 'react';
import { PrivateHeaderContainer as PrivateHeader } from '../PrivateHeader';

export class DashboardLayout extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="Meteor Boilerplate" />
        <div className="page-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
