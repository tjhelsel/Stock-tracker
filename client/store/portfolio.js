import axios from 'axios';
import { LOGOUT } from './auth';

const apiKey = process.env.API_KEY;

const PORTFOLIO_VALUES = 'PORTFOLIO_VALUES';

const portfolioValues = portfolio => ({
  type: PORTFOLIO_VALUES,
  portfolio
});

export const getPortfolio = purchases => {
  return async dispatch => {
    try {
      const stockCounts = countStocks(purchases);
      const portfolio = await calculateValues(stockCounts);
      dispatch(portfolioValues(portfolio));
    } catch (error) {
      console.error(error);
    }
  };
};

const countStocks = purchases => {
  const stockCounts = {};
  purchases.forEach(stock => {
    const { symbol, qty } = stock;
    if (stockCounts.hasOwnProperty(symbol)) {
      stockCounts[symbol] += qty;
    } else {
      stockCounts[symbol] = qty;
    }
  });
  return stockCounts;
};

const calculateValues = async stockCounts => {
  const values = [];
  let totalValue = 0;
  for (let symbol in stockCounts) {
    if (stockCounts.hasOwnProperty(symbol)) {
      const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );

      const quote = data['Global Quote'];
      const curPrice = +quote['05. price'];
      const openPrice = +quote['02. open'];
      const qty = +stockCounts[symbol];
      const value = +(qty * curPrice).toFixed(2);
      let priceTrend;

      if (curPrice === openPrice) {
        priceTrend = 'same';
      } else if (curPrice < openPrice) {
        priceTrend = 'decreasing';
      } else {
        priceTrend = 'increasing';
      }

      const stock = {
        symbol,
        openPrice,
        priceTrend,
        curPrice,
        value,
        qty
      };
      values.push(stock);
      totalValue += +value;
    }
  }
  return { totalValue, values };
};

const initialState = { totalValue: 0, values: [], isUpdated: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PORTFOLIO_VALUES:
      return { ...action.portfolio, isUpdated: true };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
