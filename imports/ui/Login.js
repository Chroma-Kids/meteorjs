import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

export class Login extends React.Component {

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

    this.props.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password.' });
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
          <h1>Login</h1>

          {error && <p>{error}</p>}

          <form className="boxed-view__form" onSubmit={this.onSubmit} noValidate>
            <input type="email" name="email" placeholder="Email" onChange={this.onEmailChange} value={email} />
            <input type="password" name="password" placeholder="Password" onChange={this.onPasswordChange} value={password} />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
}

export const LoginContainer = withTracker(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword,
  };
})(Login);