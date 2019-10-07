import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import Login from './Login';
import UserHome from './UserHome';
import Signup from './Signup';
import SelectedStock from './SelectedStock';
import Transactions from './Transactions';
import Navbar from './Navbar';

const Main = props => {
  const { user } = props;
  return (
    <Router history={history}>
      <Navbar />
      {user ? (
        // Routes below available only for logged in users
        <div className="content">
          <Route path="/portfolio" component={UserHome} />
          <Route
            exact
            path="/portfolio/buy/:symbol"
            component={SelectedStock}
          />
          <Route exact path="/transactions" component={Transactions} />
        </div>
      ) : (
        // Routes below available to non-logged in users
        <div className="content">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      )}
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Main);
