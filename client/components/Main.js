import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import Login from './Login';
import UserHome from './UserHome';

const Main = props => {
  const { user } = props;
  return (
    <Router history={history}>
      <nav>
        <h1>Welcome to Stock Trader!</h1>
      </nav>
      <Switch>
        {user ? (
          // Routes below available only for logged in users
          <Route exact path="/home" component={UserHome} />
        ) : (
          // Routes below available to non-logged in users
          <Route exact path="/login" component={Login} />
        )}
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Main);
