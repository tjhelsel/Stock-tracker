import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import Login from './Login';
import UserHome from './UserHome';
import Signup from './Signup';

const Main = props => {
  const { userId } = props;
  console.log(props);
  return (
    <Router history={history}>
      <nav>
        <h1>Welcome to Stock Trader!</h1>
      </nav>
      <Switch>
        {userId ? (
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
  userId: state.userId
});

export default connect(mapStateToProps)(Main);
