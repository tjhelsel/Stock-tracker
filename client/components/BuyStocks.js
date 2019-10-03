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
    if (event.target.value) {
      this.props.fetchStocks(event.target.value);
    }
  }

  render() {
    const { query } = this.state;
    const { stocks, selected } = this.props;
    return (
      <div>
        <div>
          <h1>Buy stocks</h1>
          <label>Search for stocks:</label>
          <input
            name="query"
            value={query}
            onChange={event => this.handleChange(event)}
          />
          <ul>
            {stocks.map(stock => {
              const symbol = stock['1. symbol'];
              return (
                <li key={symbol}>
                  <Link to={`/buy/${symbol}`}>{stock['2. name']}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.alphavantage.searchResults,
  selected: state.alphavantage.selectedStock
});

const mapDispatchToProps = dispatch => ({
  fetchStocks: query => dispatch(fetchStocks(query)),
  fetchStock: symbol => dispatch(fetchStock(symbol))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks);
