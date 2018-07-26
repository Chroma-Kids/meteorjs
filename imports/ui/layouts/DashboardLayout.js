import React from 'react';
import { HeaderContainer as Header } from '../Header';

export class DashboardLayout extends React.Component {
  render() {
    return (
      <div>
        <Header title="Chroma Kids" />
        <div className="page-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
