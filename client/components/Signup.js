import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../store/reducer';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(target) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state;
    if (password === confirmPassword) {
      this.props.createUser({ firstName, lastName, email, password });
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state;

    return (
      <div>
        <h1>Sign up for Stock-Tracker</h1>
        <h2>Enter your information below to create an account</h2>
        <form onSubmit={event => this.handleSubmit(event)}>
          <div>
            <label>First name:</label>
            <input
              name="firstName"
              value={firstName}
              required
              onChange={event => this.handleChange(event.target)}
            />
          </div>
          <div>
            <label>Last name:</label>
            <input
              name="lastName"
              value={lastName}
              required
              onChange={event => this.handleChange(event.target)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={event => this.handleChange(event.target)}
            />
            {this.props.signupFailed
              ? 'This email is already associated with an account'
              : ''}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={event => this.handleChange(event.target)}
            />
          </div>
          <div>
            <label>Retype password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={event => this.handleChange(event.target)}
            />
            {password !== confirmPassword ? 'Passwords do not match' : ''}
          </div>
          <input type="submit" value="Create account" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signupFailed: state.signupFailed
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
