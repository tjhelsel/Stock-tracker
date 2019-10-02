import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserHome extends Component {
  componentDidMount() {}

  render() {
    const { id, cash, firstName, lastName } = this.props.user;
    return (
      <div>
        <h1>{`${firstName}'s portfolio`}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserHome);
