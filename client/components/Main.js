import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

import Login from './Login';

const Main = () => {
  return (
    <Router history={history}>
      <nav>
        <h1>Welcome to Stock Trader!</h1>
      </nav>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Main;
