import React, {Component} from 'react';
import { connect } from 'react-redux';

class UserHome extends Component {
  componentDidMount() {

  }
  
  render() {

    const { userId } = this.props;
    return (
      <div>
      <h1>{`${userId}'s portfolio`}</h1>
    </div>
  );
  }
}

const mapStateToProps = state => ({
  userId: state.userId
});

export default connect(mapStateToProps)(UserHome);
