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
          <form onSubmit={event => this.handleSubmit(event)}>
            <label>Search for stocks:</label>
            <input
              name="query"
              value={query}
              onChange={event => this.handleChange(event)}
            />
            <button type="submit">Search</button>
          </form>
          <ul>
            {stocks.map(stock => {
              const symbol = stock['1. symbol'];
              return (
                <li key={symbol}>
                  <Link to={`/buy/${symbol}`}>
                    {symbol} -- {stock['2. name']}
                  </Link>
                </li>
              );
            })}
          </ul>
          {searchFailed ? (
            <p>No results found. Please try another query.</p>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.alphavantage.searchResults,
  selected: state.alphavantage.selectedStock,
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
