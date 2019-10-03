import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import alphavantage from './alphavantage';

const reducer = combineReducers({ auth, alphavantage });

const store = createStore(reducer, applyMiddleware(logger, thunkMiddleware));

export default store;
