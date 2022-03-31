import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashBoard from './dashBoard';
import { getUserInfo, logout } from '../../actions/userActions';
import getUserEntries from '../../actions/entryActions';
import groupBy from '../../services/groupEntries';
import Sidebar from '../common/Sidebar';
import Entries from './Entries';
import Paginate from './Paginate';


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
    const {
      retrieveUserInfo,
      retrieveUserEntries,
      isLoggedIn,
      payload
    } = this.props;
    const { token = '' } = JSON.parse(localStorage.getItem('MY_DIARY_USER')) ? JSON.parse(localStorage.getItem('MY_DIARY_USER')).data : {};
    if (payload.message === 'User is unauthorized' || !token) {
      this.handleLogout();
    }
    this.setState({ token });
    retrieveUserInfo(token);
    retrieveUserEntries(token);
    window.addEventListener('click', (event) => {
      const { isSidebarShown } = this.state;
      if (event.target.id === 'app' && isSidebarShown) {
        this.toggleSidebar();
      }
    });
  }

  componentDidUpdate() {
    const { payload } = this.props;
    const { token = '' } = JSON.parse(localStorage.getItem('MY_DIARY_USER')) ? JSON.parse(localStorage.getItem('MY_DIARY_USER')).data : {};
    if (payload.message === 'User is unauthorized' || !token) {
      this.handleLogout();
    }
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
    const PaginatedComponent = Paginate({
      WrappedComponent: Entries,
      itemsPerPage: 4,
      entries: Object.entries(entries)
    });

    return (
      <div className="row">
        <Sidebar
          payload={payload}
          isSidebarShown={isSidebarShown}
          handleLogout={this.handleLogout}
        />
        <div className="main-form">
          <div className="row bottom-border fixed-header">
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
            <div className="full-width show-big-screen" style={{ padding: '5px' }}>
              <a id="logout-big" href="#" className="btn" onClick={this.handleLogout}>Logout</a>
            </div>
          </div>

          <div id="app" style={{ paddingTop: '70px', display: 'flex', flexDirection: 'column'}}>
            <DashBoard token={token} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              { Object.entries(entries).length
                ? <PaginatedComponent />
                : <p>You do not have an entry. You can add one now</p>
              }
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
