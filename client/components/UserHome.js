import React, { Component } from 'react';
import { connect } from 'react-redux';
import Portfolio from './Portfolio';
import BuyStocks from './BuyStocks';

class UserHome extends Component {
  componentDidMount() {}

  render() {
    const { id, cash, firstName, lastName } = this.props.user;
    return (
      <div>
        <Portfolio />
        <BuyStocks />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(UserHome);
