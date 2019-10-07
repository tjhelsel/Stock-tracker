import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from '../store/auth';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
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
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  render() {
    const { email, password } = this.state;
    const { loginFailed } = this.props;
    return (
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <h1>User login</h1>
          {loginFailed ? (
            <div className="alert">
              <p>Incorrect email and/or password</p>
            </div>
          ) : (
            ''
          )}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={event => this.handleChange(event.target)}
            />
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
          <input type="submit" value="log in" />
        </form>
        <div>
          <h3>Don't have an account? </h3>
          <Link to="/signup">Sign up now</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginFailed: state.auth.loginFailed
});

const mapDispatchToProps = dispatch => ({
  logIn: (email, password) => dispatch(logIn(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
