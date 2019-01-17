import React from 'react';

import { Grid, Col } from 'react-bootstrap';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

export class Layout extends React.Component {

  render() {
    const { children } = this.props;

    let wrapperClass = "gray-bg " + this.props.location;

    return (
      <div id="wrapper">
        <Navigation location={this.props.location}/>
        <div id="page-wrapper" className={wrapperClass}>
          <Header/>
          {children}
          <Footer/>
        </div>
      </div>
    );
  }
}
