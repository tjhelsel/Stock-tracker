import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStock } from '../store/alphavantage';
import { makePurchase } from '../store/purchase';
import history from '../history';

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

  handleSubmit(event) {
    event.preventDefault();
    const { stock, user } = this.props;
    const { qty } = this.state;
    this.props.makePurchase(
      user.id,
      stock['01. symbol'],
      (+stock['05. price']).toFixed(2),
      qty
    );
  }

  render() {
    const { stock, user } = this.props;
    const { qty } = this.state;
    return (
      <div className="buy-stocks">
        {stock ? (
          <div>
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
                  <th scope="row">Funds after purchase:</th>
                  <td>
                    ${(user.cash / 100 - stock['05. price'] * qty).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <input
                      type="submit"
                      onClick={event => this.handleSubmit(event)}
                      disabled={user.cash < stock['05. price'] * qty}
                    />
                    <button
                      type="button"
                      value="Cancel"
                      onClick={() => history.push('/portfolio')}
                    />
                  </td>
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
  fetchStock: symbol => dispatch(fetchStock(symbol)),
  makePurchase: (userId, symbol, price, qty) =>
    dispatch(makePurchase(userId, symbol, price, qty))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedStock);
