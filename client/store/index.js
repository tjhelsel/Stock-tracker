import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import alphavantage from './alphavantage';
import purchases from './purchase';
import portfolio from './portfolio';

const reducer = combineReducers({ auth, alphavantage, purchases, portfolio });

const store = createStore(reducer, applyMiddleware(logger, thunkMiddleware));

export default store;
