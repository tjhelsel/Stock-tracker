import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { me } from '../store/auth';

class Navbar extends Component {
  componentDidMount() {
    this.props.me();
  }

  render() {
    const { user } = this.props;
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
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
