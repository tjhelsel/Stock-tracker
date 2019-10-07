import axios from 'axios';
const searchKey = process.env.SEARCH_KEY;

const SEARCH_RESULTS = 'SEARCH_RESULTS';
const SELECTED_STOCK = 'SELECTED_STOCK';
const SEARCH_FAILED = 'SEARCH_FAILED';

const searchResults = results => ({
  type: SEARCH_RESULTS,
  results
});

const selectedStock = stock => ({
  type: SELECTED_STOCK,
  stock
});

const searchFailed = () => ({
  type: SEARCH_FAILED
});

export const fetchStocks = query => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${searchKey}`
      );
      if (data.bestMatches.length) {
        dispatch(searchResults(data.bestMatches));
      } else {
        dispatch(searchFailed());
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchStock = symbol => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${searchKey}`
      );
      dispatch(selectedStock(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  searchResults: [],
  currentStock: {},
  searchFailed: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...state, searchResults: action.results, searchFailed: false };
    case SELECTED_STOCK:
      return { ...state, currentStock: action.stock };
    case SEARCH_FAILED:
      return { ...state, searchFailed: true };
    default:
      return state;
  }
};

export default reducer;
