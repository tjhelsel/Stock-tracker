import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../store/reducer';

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
        <h1>Login page</h1>
        {loginFailed ? (
          <div>
            <p>Incorrect email and/or password</p>
          </div>
        ) : (
          ''
        )}
        <form onSubmit={event => this.handleSubmit(event)}>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginFailed: state.loginFailed
});

const mapDispatchToProps = dispatch => ({
  logIn: (email, password) => dispatch(logIn(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
