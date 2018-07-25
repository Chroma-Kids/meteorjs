import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export class PrivateHeader extends React.Component {
  render() {
    const { title, handleLogout } = this.props;
    return (
      <div className="header">
        <div className="header__content">
          <h1 className="header__title">{title}</h1>
          <button className="button button--link-text" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export const PrivateHeaderContainer = withTracker(() => {
  return {
    handleLogout: () => Accounts.logout(),
  };
})(PrivateHeader);