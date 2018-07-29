import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { NavDropdown, MenuItem } from 'react-bootstrap';

export class DropdownUser extends React.Component {
  render() {
    const { user, handleLogout } = this.props;
    return (
      <div className="header__user">
        <NavDropdown
          title={
            <React.Fragment>
              <img className="header__user-avatar" src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" />
              {user && <span className="header__user-name">{`${user.profile.firstName} ${user.profile.lastName}`}</span>}
            </React.Fragment>}
          noCaret
          id="dropdown-no-caret">
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </NavDropdown>
      </div>
    );
  }
}

DropdownUser.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
};

export const DropdownUserContainer = withTracker(() => {
  return {
    handleLogout: () => Accounts.logout(),
    user: Meteor.user(),
  };
})(DropdownUser);