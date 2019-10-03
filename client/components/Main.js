import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import Login from './Login';
import UserHome from './UserHome';
import Signup from './Signup';
import BuyStocks from './BuyStocks';
import SelectedStock from './SelectedStock';

const Main = props => {
  const { user } = props;
  return (
    <Router history={history}>
      <nav>
        <h1>Welcome to Stock-Tracker!</h1>
        {user ? (
          <div>
            <h1>User info</h1>
            <Link to="/buy">Buy stocks</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </nav>
      {user ? (
        // Routes below available only for logged in users
        <div>
          <Route exact path="/home" component={UserHome} />
          <Route path="/buy" component={BuyStocks} />
          <Route path="/buy/:symbol" component={SelectedStock} />
        </div>
      ) : (
        // Routes below available to non-logged in users
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/" component={Login} />
        </Switch>
      )}
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Main);
