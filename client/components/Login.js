import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(target) {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login page</h1>
        <form>
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
