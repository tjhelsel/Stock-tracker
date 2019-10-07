import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { me } from '../store/auth';

class Navbar extends Component {
  componentDidMount() {
    this.props.me();
  }

  signOut(event) {
    event.preventDefault();
  }

  render() {
    const { user } = this.props;
    return (
      <nav id="navbar" className="sticky">
        <h1>Stock-Tracker</h1>
        {user ? (
          <div className="links">
            <Link className="navlink" to="/portfolio">
              Buy stocks
            </Link>
            <Link className="navlink" to="/transactions">
              Transactions
            </Link>
            <Link className="navlink" to="/logout">
              Log out
            </Link>
          </div>
        ) : (
          <div className="links">
            <Link className="navlink" to="/login">
              Log in
            </Link>
            <Link className="navlink" to="/signup">
              Sign up
            </Link>
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
