import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

export class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.state = {
      error: '',
      email: '',
      password: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    if (password.length < 5) {
      return this.setState({ error: 'Password must be at least 5 characters long.' });
    }

    this.props.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value.trim() });
  }
  onPasswordChange(e) {
    this.setState({ password: e.target.value.trim() });
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>

          {error && <p>{error}</p>}

          <form className="boxed-view__form" onSubmit={this.onSubmit} noValidate>
            <input type="email" name="email" placeholder="Email" onChange={this.onEmailChange} value={email} />
            <input type="password" name="password" placeholder="Password" onChange={this.onPasswordChange} value={password} />
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired,
}

export const SignupContainer = withTracker(() => {
  return {
    createUser: Accounts.createUser,
  };
})(Signup);