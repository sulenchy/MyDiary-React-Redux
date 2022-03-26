import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashBoard from './dashBoard';
import { getUserInfo, logout } from '../../actions/userActions';
import getUserEntries from '../../actions/entryActions';
import groupBy from '../../services/groupEntries';
import Sidebar from '../common/Sidebar';

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
    this.state = {
      isSidebarShown: false,
      token: ''
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    const { retrieveUserInfo, retrieveUserEntries } = this.props;
    const { token = '' } = JSON.parse(localStorage.getItem('MY_DIARY_USER')) ? JSON.parse(localStorage.getItem('MY_DIARY_USER')).data : {};
    if (!token) {
      this.handleLogout();
    }
    this.setState({ token });
    retrieveUserInfo(token);
    retrieveUserEntries(token);
    window.addEventListener('click', (event) => {
      if (event.target.id === 'app' && this.state.isSidebarShown) {
        this.toggleSidebar();
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.toggleSidebar);
  }

  handleLogout() {
    const { logoutUser } = this.props;
    logoutUser();
  }

  toggleSidebar() {
    this.setState(state => ({
      isSidebarShown: !state.isSidebarShown
    }));
  }


  render() {
    const { isLoggedIn, payload, entryPayload } = this.props;
    const { isSidebarShown, token } = this.state;

    let entries = {};
    if (entryPayload.payload.entries) {
      entries = groupBy(entryPayload.payload.entries, 'date');
    }
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row">
        <Sidebar
          payload={payload}
          isSidebarShown={isSidebarShown}
          handleLogout={this.handleLogout}
        />
        <div className="main-form">
          <div className="row bottom-border" style={{ position: 'fixed', width: '100%', background: '#fff' }}>
            <div className="left">
              <h2>
                <button
                    className="hamburgerIcon" onClick={this.toggleSidebar} type="button">
                    &#9776;
                </button>
                {' '}
&nbsp;&nbsp; &nbsp;&nbsp; My Diary... Your Thoughts & Feelings

              </h2>
            </div>
            <div className="full-width" style={{ padding: '5px' }}>
              <a id="logout-big" href="#" className="right btn" onClick={this.handleLogout}>Logout</a>
            </div>
          </div>

          <div id="app" style={{ paddingTop: '70px' }}>
            <DashBoard token={token} />
            <div className="container">
              <h2>Entries in Days</h2>
              <input type="text" className="input-field" id="search" placeholder="Search" name="search" />
              {Object.keys(entries).map((entry) => {
                const { length } = entries[entry];
                const entryDetail = { length, entry };
                return <EntryCard key={entry} data={entryDetail} />;
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
