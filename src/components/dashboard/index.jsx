import React, { Component } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashBoard from './dashBoard';
import { getUserInfo, logout } from '../../actions/userActions';
import getUserEntries from '../../actions/entryActions';
import groupBy from '../../services/groupEntries';
import Entries from './Entries';
import Paginate from './Paginate';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  componentDidMount() {
    const {
      retrieveUserEntries,
    } = this.props;
    const { token = '' } = JSON.parse(localStorage.getItem('MY_DIARY_USER')) ? JSON.parse(localStorage.getItem('MY_DIARY_USER')).data : {};
    retrieveUserEntries(token);
    this.setState({ token });
  }

  render() {
    const { isLoggedIn, entryPayload } = this.props;
    const { token } = this.state;

    let entries = {};
    if (entryPayload.payload.entries) {
      entries = groupBy(entryPayload.payload.entries, 'date');
    }
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    const PaginatedComponent = Paginate({
      WrappedComponent: Entries,
      itemsPerPage: 4,
      entries: Object.entries(entries)
    });

    return (
      <div id="app" style={{ paddingTop: '70px', display: 'flex', flexDirection: 'column' }}>
        <DashBoard token={token} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          { Object.entries(entries).length
            ? <PaginatedComponent />
            : <p>You do not have an entry. You can add one now</p>
          }
        </div>
      </div>
    );
  }
}


Index.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  retrieveUserEntries: PropTypes.func.isRequired,
  entryPayload: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.globalreducer.isLoggedIn,
  payload: state.userReducer.payload,
  entryPayload: state.entryReducer
});

export const mapDispatchToProp = dispatch => ({
  retrieveUserEntries: (token) => {
    dispatch(getUserEntries(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProp)(Index);
