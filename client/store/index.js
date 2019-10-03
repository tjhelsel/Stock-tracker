import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import alphavantage from './alphavantage';
import purchases from './purchase';

const reducer = combineReducers({ auth, alphavantage, purchases });

const store = createStore(reducer, applyMiddleware(logger, thunkMiddleware));

export default store;
