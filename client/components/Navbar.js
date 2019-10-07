import React from 'react';
import {
  // Router, Switch, Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
// import history from '../history';
// import Login from './Login';
// import UserHome from './UserHome';
// import Signup from './Signup';
// import BuyStocks from './BuyStocks';
// import SelectedStock from './SelectedStock';
// import Transactions from './Transactions';

const Navbar = props => {
  const { user } = props;
  return (
    <nav id="navbar" className="sticky">
      <h1>Stock-Tracker</h1>
      {user ? (
        <div className="links">
          <Link to="/portfolio">Buy stocks</Link>
          <Link to="/transactions">Transactions</Link>
        </div>
      ) : (
        <div className="links">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Navbar);
