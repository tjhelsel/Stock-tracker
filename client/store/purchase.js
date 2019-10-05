import axios from 'axios';
import history from '../history';

const GOT_PURCHASES = 'GOT_PURCHASES';
const NEW_PURCHASE = 'NEW_PURCHASE';

const gotPurchases = purchases => ({
  type: GOT_PURCHASES,
  purchases
});

const newPurchase = purchase => ({
  type: NEW_PURCHASE,
  purchase
});

export const getPurchases = userId => {
  return async dispatch => {
    try {
      const purchases = await axios.get(`/api/purchases/${userId}`);
      dispatch(gotPurchases(purchases));
    } catch (error) {
      console.error(error);
    }
  };
};

export const makePurchase = (userId, symbol, price, qty) => {
  return async dispatch => {
    try {
      const purchase = await axios.post(`/api/purchases/${userId}`, {
        symbol,
        price,
        qty
      });
      dispatch(newPurchase(purchase));
      history.push('/home');
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PURCHASES:
      return action.purchases;
    case NEW_PURCHASE:
      return [...state, action.purchase];
    default:
      return state;
  }
};

export default reducer;
