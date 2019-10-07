import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchStocks, fetchStock } from '../store/alphavantage';
import SelectedStock from './SelectedStock';
import StockSearch from './StockSearch';

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
    const { cash } = this.props;
    return (
      <div>
        <div>
          <h1>Buy stocks</h1>
          <h2>Cash available: ${(cash / 100).toFixed(2)}</h2>
          <Route exact path="/portfolio" component={StockSearch} />
          <Route
            exact
            path="/portfolio/buy/:symbol"
            component={SelectedStock}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.alphavantage.searchResults,
  searchFailed: state.alphavantage.searchFailed,
  cash: state.auth.user.cash,
  selected: state.alphavantage.currentStock['Global Quote']
});

const mapDispatchToProps = dispatch => ({
  fetchStocks: query => dispatch(fetchStocks(query)),
  fetchStock: symbol => dispatch(fetchStock(symbol))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks);
