import React from 'react';
import { connect } from 'react-redux';

const UserHome = props => {
  const { user } = props;
  return (
    <div>
      <h1>{`${user.firstName}'s portfolio`}</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserHome);
