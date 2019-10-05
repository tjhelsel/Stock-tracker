import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserHome extends Component {
  componentDidMount() {}

  render() {
    const { id, cash, firstName, lastName } = this.props.user;
    return (
      <div>
        <h1>{`${firstName} ${lastName}'s portfolio`}</h1>
        <h2>Cash: {`$${(cash / 100).toFixed(2)}`}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(UserHome);
