import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortfolio } from '../store/portfolio';

class Portfolio extends Component {
  componentDidMount() {
    const { purchases } = this.props.user;
    this.props.getPortfolio(purchases);
  }

  render() {
    const { firstName, lastName, cash } = this.props.user;
    const { totalValue, values } = this.props.portfolio;
    return (
      <div>
        <h1>{`${firstName} ${lastName}'s portfolio`}</h1>
        <h2>Total value: {totalValue}</h2>
        <h2>Cash: {`$${(cash / 100).toFixed(2)}`}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  portfolio: state.portfolio
});

const mapDispatchToProps = dispatch => ({
  getPortfolio: purchases => dispatch(getPortfolio(purchases))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
