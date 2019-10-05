import axios from 'axios';
const apiKey = process.env.API_KEY;

const SEARCH_RESULTS = 'SEARCH_RESULTS';
const SELECTED_STOCK = 'SELECTED_STOCK';

const searchResults = results => ({
  type: SEARCH_RESULTS,
  results
});

const selectedStock = stock => ({
  type: SELECTED_STOCK,
  stock
});

export const fetchStocks = query => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`
      );
      dispatch(searchResults(data.bestMatches || []));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchStock = symbol => {
  return async dispatch => {
    try {
      console.log('fetchstock called');
      const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );
      dispatch(selectedStock(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { searchResults: [], currentStock: {} };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...state, searchResults: action.results };
    case SELECTED_STOCK:
      return { ...state, currentStock: action.stock };
    default:
      return state;
  }
};

export default reducer;
