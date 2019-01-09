import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashBoard from './dashBoard';
import { getUserInfo, logout } from '../../actions/userActions';
import getUserEntries from '../../actions/entryActions';
import groupBy from '../../services/groupEntries';

const DisplaySingle = (props) => {
  const {
    title,
    entryType,
    created,
    handlePopupContent,
  } = props;
  const time = created.split('T')[1].split('.')[0];
  return (
    <div className="card row" style={entryType === 'cards' ? { display: 'none' } : { display: 'flex' }}>
      <div className="day">
        <Link id="time-7" to="#">
          <h2 value={created} onClick={handlePopupContent}>{time}</h2>
        </Link>
      </div>
      <div className="entry">
        <Link id="title-7" to="#">
          <h2 value={created} onClick={handlePopupContent}>{title}</h2>
        </Link>
      </div>
      <div className="row">
        <div className="buttons">
          <div className="container">
            <Link id="delete" to="#">
              <i className="fa fa-trash" />
            </Link>
          </div>
          <div className="container">
            <Link id="edit" to="#">
              <i className="fa fa-edit" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

DisplaySingle.propTypes = {
  title: PropTypes.string.isRequired,
  entryType: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  handlePopupContent: PropTypes.func.isRequired
};

const EntryCard = (props) => {
  const { data, handleDisplay, entryType } = props;
  return (
    <Link to="#" className="entrygroup" onClick={handleDisplay} style={entryType !== 'cards' ? { display: 'none' } : { display: 'block' }}>
      <div className="card row-entry">
        <div className="day" id={data.entry}>
          <h2 id={data.entry}>{data.entry}</h2>
        </div>
        <div className="entry" id={data.entry}>
          <h2 id={data.entry}>
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
  data: PropTypes.object.isRequired,
  handleDisplay: PropTypes.func.isRequired,
  entryType: PropTypes.string.isRequired
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryType: 'cards',
      date: '',
      singleEntries: '',
      modalTitle: '',
      modalBody: ''
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handlePopupContent = this.handlePopupContent.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    const { retrieveUserInfo, retrieveUserEntries } = this.props;
    if (localStorage.getItem('user')) {
      const { token } = JSON.parse(localStorage.getItem('user'));
      retrieveUserInfo(token);
      retrieveUserEntries(token);
    }
  }

  handleLogout() {
    const { logoutUser, history } = this.props;
    logoutUser(history);
  }

  handleDisplay(e) {
    const { entryPayload } = this.props;
    const { entries } = entryPayload.payload;
    const singleEntries = entries.filter(entry => entry.date === e.target.id);
    this.setState({ date: e.target.id, entryType: 'single card', singleEntries });
  }

  handlePopupContent(e) {
    const { entryPayload } = this.props;
    const { entries } = entryPayload.payload;
    const singleEntry = entries.filter(entry => entry.created === e.target.attributes['0'].nodeValue);
    this.setState({ modalTitle: singleEntry[0].title, modalBody: singleEntry[0].content });
    this.handlePopup();
  }

  handlePopup() {
    const modal = document.getElementById('modalBox2');
    if (modal.style.display !== 'block') {
      modal.style.display = 'block';
    } else {
      modal.style.display = 'none';
    }
  }

  resetState() {
    this.setState({ entryType: 'cards' });
  }

  render() {
    const { isLoggedIn, entryPayload } = this.props;
    const {
      entryType,
      date,
      singleEntries,
      modalTitle,
      modalBody
    } = this.state;
    let entries = {};
    if (entryPayload.payload.entries) {
      entries = groupBy(entryPayload.payload.entries, 'date');
    }

    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    const heading = entryType !== 'cards' ? `Entry on ${date}` : 'Entries in Days';
    
    const singles = singleEntries === '' ? [] : singleEntries.sort((a, b) => {
      a = new Date(a.created);
      b = new Date(b.created);
      return b - a;
    });
    
    return (
      <div className="row">
        <div id="mySidenav" className="sidenav">
          <hr />
          <Link id="entries" to="#" onClick={this.resetState}>Entries</Link>
          <Link id="profile" to="#">User Profile</Link>
          <Link id="logout-small" to="#" className="logout" onClick={this.handleLogout}>Logout</Link>
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
              <Link id="logout-big" to="#" className="right btn" onClick={this.handleLogout}>Logout</Link>
            </div>
          </div>

          <div id="app">
            <DashBoard toggle />
            <div className="container">
              <h2>{heading}</h2>
              <input type="text" className="input-field" id="search" placeholder="Search" name="search" />
              {/* body */}
              {Object.keys(entries).map((entry, index) => {
                const { length } = entries[entry];
                const entryDetail = { length, entry };
                return <EntryCard data={entryDetail} key={`card-${String(index)}`} handleDisplay={this.handleDisplay} entryType={entryType} />;
              })}
              {
                singles.map((entry, index) => (
                  <DisplaySingle
                    key={String(index)}
                    title={entry.title}
                    entryType={entryType}
                    created={entry.created}
                    handlePopupContent={this.handlePopupContent}
                    handlePopup={this.handlePopup}
                  />
                ))
              }
            </div>

          </div>
          <div id="modalBox2" className="modal">
            <div className="modal-container">
              <div id="modal-app">
                <div className="imgcontainer">
                  <span className="close" title="Close Modal" onClick={this.handlePopup}>×</span>
                </div>
                <h2>{modalTitle}</h2>
                <p>{modalBody}</p>
              </div>
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
  history: PropTypes.object.isRequired,
  entryPayload: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.globalreducer.isLoggedIn,
  payload: state.userReducer.payload,
  entryPayload: state.entryReducer,
  errors: state.globalreducer.error,
});

export const mapDispatchToProp = dispatch => ({
  retrieveUserInfo: (token) => {
    dispatch(getUserInfo(token));
  },
  retrieveUserEntries: (token) => {
    dispatch(getUserEntries(token));
  },
  logoutUser: (history) => {
    dispatch(logout(history));
  },
});

export default connect(mapStateToProps, mapDispatchToProp)(Index);
