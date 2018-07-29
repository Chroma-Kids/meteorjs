import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { DropdownUserContainer as DropdownUser } from './common/buttons/DropdownUser';

export class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <Navbar fluid className="header">
        <Nav pullRight>
          <DropdownUser />
        </Nav>
      </Navbar>
    );
  }
}

Header.propTypes = {
};
