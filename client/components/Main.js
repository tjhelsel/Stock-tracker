import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import Login from './Login';
import UserHome from './UserHome';
import Signup from './Signup';

const Main = props => {
  const { user } = props;
  return (
    <Router history={history}>
      <nav>
        <h1>Welcome to Stock Trader!</h1>
        {user ? (
          <h1>User info</h1>
        ) : (
          <div>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </nav>
      <Switch>
        {user ? (
          // Routes below available only for logged in users
          <Route exact path="/home" component={UserHome} />
        ) : (
          // Routes below available to non-logged in users
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Login} />
          </Switch>
        )}
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Main);
