import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/auth';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h2>Logging out of Stock-Tracker...</h2>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
