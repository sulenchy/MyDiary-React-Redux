import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashBoard from './dashBoard';
import { getUserInfo, logout } from '../../actions/userActions';
import getUserEntries from '../../actions/entryActions';
import groupBy from '../../services/groupEntries';

const EntryCard = (props) => {
  const { data } = props;
  return (
    <Link to="#" className="entrygroup">
      <div className="card row-entry">
        <div className="day">
          <h2>{data.entry}</h2>
        </div>
        <div className="entry">
          <h2>
            {data.length}
            {' '}
            entry
          </h2>
        </div>
      </div>
    </Link>
  );
};

EntryCard.propTypes = {
  data: PropTypes.object.isRequired
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { retrieveUserInfo, retrieveUserEntries } = this.props;
    const { token } = JSON.parse(localStorage.getItem('user'));
    retrieveUserInfo(token);
    retrieveUserEntries(token);
  }

  handleLogout() {
    const { logoutUser } = this.props;
    logoutUser();
  }


  render() {
    const { isLoggedIn, payload, entryPayload } = this.props;
    let entries = {};
    if (entryPayload.payload.entries) {
      entries = groupBy(entryPayload.payload.entries, 'date');
    }
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row">
        <div id="mySidenav" className="sidenav">
          {/* <a href="javascript:void(0)" className="closebtn" onClick="closeNav()">&times;</a> */}

          <a href="#" id="profile-pic"><img className="img-center" id="img-element" alt="Avatar" src={payload.user ? payload.user[0].passporturl : '#'} /></a>
          <a id="username" href="#">{payload.user ? payload.user[0].fullname : ''}</a>
          <hr />
          <a id="entries" href="#">Entries</a>
          <a id="profile" href="#" onClick="userProfile();">User Profile</a>
          <a id="logout-small" href="#" className="logout" onClick={this.handleLogout}>Logout</a>
        </div>
        <div className="main-form">
          <div className="row bottom-border">
            <div className="left">
              <h2>
                <span className="hamburgerIcon">&#9776;</span>
                {' '}
&nbsp;&nbsp; &nbsp;&nbsp; My Diary... Your Thoughts & Feelings

              </h2>
            </div>
            <div className="full-width">
              <a id="logout-big" href="#" className="right btn" onClick={this.handleLogout}>Logout</a>
            </div>
          </div>

          <div id="app">
            <DashBoard />
            <div className="container">
              <h2>Entries in Days</h2>
              <input type="text" className="input-field" id="search" placeholder="Search" name="search" />
              {Object.keys(entries).map((entry) => {
                const { length } = entries[entry];
                const entryDetail = { length, entry };
                return <EntryCard data={entryDetail} />;
              })}

            </div>

          </div>

        </div>
      </div>
    );
  }
}


Index.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  retrieveUserInfo: PropTypes.func.isRequired,
  retrieveUserEntries: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  payload: PropTypes.object.isRequired,
  entryPayload: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.globalreducer.isLoggedIn,
  payload: state.userReducer.payload,
  entryPayload: state.entryReducer
});

export const mapDispatchToProp = dispatch => ({
  retrieveUserInfo: (token) => {
    dispatch(getUserInfo(token));
  },
  retrieveUserEntries: (token) => {
    dispatch(getUserEntries(token));
  },
  logoutUser: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProp)(Index);
