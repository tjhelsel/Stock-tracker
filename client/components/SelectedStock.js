import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStock } from '../store/alphavantage';

class SelectedStock extends Component {
  constructor() {
    super();
    this.state = {
      qty: 1
    };
  }

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.symbol);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { stock, user } = this.props;
    const { qty } = this.state;
    return (
      <div>
        {stock ? (
          <div>
            <h1>Stock details:</h1>
            <table>
              <tbody>
                <tr>
                  <th scope="row">Ticker Symbol:</th>
                  <td>{stock['01. symbol']}</td>
                </tr>
                <tr>
                  <th scope="row">Current price:</th>
                  <td>${stock['05. price']}</td>
                </tr>
                <tr>
                  <th scope="row">Desired quantity:</th>
                  <td>
                    <input
                      name="qty"
                      type="number"
                      min="1"
                      value={this.state.qty}
                      onChange={event => this.handleChange(event)}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Total cost:</th>
                  <td>${(qty * stock['05. price']).toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">Funds available:</th>
                  <td>${(user.cash / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">Funds after transaction:</th>
                  <td>${(user.cash - stock['05. price'] / 100).toFixed(2)} </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.alphavantage.currentStock['Global Quote'],
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedStock);
