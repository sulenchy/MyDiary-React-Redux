import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (<div>Welcome to the index page</div>);
  }
}


Index.propTypes = {
  isLoggedIn: PropTypes.bool
};

Index.defaultProps = {
  isLoggedIn: false
};

const mapStateToProps = state => ({
  status: state.globalreducer,
});


export default connect(mapStateToProps)(Index);
