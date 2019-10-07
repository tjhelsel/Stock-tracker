import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStocks, fetchStock } from '../store/alphavantage';

class BuyStocks extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { query } = this.state;
    if (query) {
      this.props.fetchStocks(query);
    }
  }

  render() {
    const { query } = this.state;
    const { stocks, cash, searchFailed } = this.props;
    return (
      <div>
        <div>
          <h1>Buy stocks</h1>
          <h2>Cash available: ${(cash / 100).toFixed(2)}</h2>
          <form id="buy-form" onSubmit={event => this.handleSubmit(event)}>
            <div>
              <label>Search by company or ticker symbol:</label>
              <input
                name="query"
                value={query}
                onChange={event => this.handleChange(event)}
              />
              <button type="submit">Search</button>
            </div>
            <ul>
              {stocks.map(stock => {
                const symbol = stock['1. symbol'];
                return (
                  <li key={symbol}>
                    <Link to={`/portfolio/buy/${symbol}`}>
                      {symbol} -- {stock['2. name']}
                    </Link>
                  </li>
                );
              })}
              {searchFailed ? (
                <p>No results found. Please try another query.</p>
              ) : (
                ''
              )}
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.alphavantage.searchResults,
  searchFailed: state.alphavantage.searchFailed,
  cash: state.auth.user.cash
});

const mapDispatchToProps = dispatch => ({
  fetchStocks: query => dispatch(fetchStocks(query)),
  fetchStock: symbol => dispatch(fetchStock(symbol))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks);
