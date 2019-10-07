import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortfolio } from '../store/portfolio';

class Portfolio extends Component {
  componentDidMount() {
    const { purchases } = this.props.user;
    this.props.getPortfolio(purchases);
  }

  render() {
    const { firstName, lastName } = this.props.user;
    const { totalValue, values } = this.props.portfolio;
    return (
      <div>
        <h1>{`${firstName} ${lastName}'s portfolio`}</h1>
        <h2>Portfolio value: ${totalValue.toFixed(2)}</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Ticker symbol</th>
              <th scope="col">Shares owned</th>
              <th scope="col">Current value</th>
              <th scope="col">Today's trend</th>
              <th scope="col">Total value</th>
            </tr>
          </thead>
          <tbody>
            {values.map(value => {
              return (
                <tr key={value.symbol} className={value.priceTrend}>
                  <td> {value.symbol} </td>
                  <td> {value.qty} </td>
                  <td> {value.curPrice}</td>
                  <td>{value.priceTrend}</td>
                  <td>$ {value.value} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
