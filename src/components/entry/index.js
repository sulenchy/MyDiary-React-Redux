import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    const modal = document.getElementById('modalBox');
    if (modal.style.display !== 'block') {
      modal.style.display = 'block';
    } else {
      modal.style.display = 'none';
    }
  }

  render() {
    return (
      <div id="dashboard" className="container">
        <div className="card-dash col-1-3">
          <h2>Total entry</h2>
          <h2>2</h2>
        </div>
        <div className="card-dash col-1-3">
          <h2>Add New</h2>
          <h2>
            <Link to="#" onClick={this.handleModal}><i className="fas fa-plus-circle" id="add-new" /></Link>
          </h2>
        </div>
        <div className="card-dash col-1-3">
          <h2 id="txt">12:50:00</h2>
        </div>
        <div id="modalBox" className="modal">
          <div className="modal-container">
            <div id="modal-app">
              <form>
                <div className="imgcontainer">
                  <button type="button" onClick={this.handleModal} className="close" title="Close Modal">&times;</button>
                  <h2>Add Entry</h2>
                </div>
                <ul id="add_new_error" className="text-red" />
                <div className="input-container">
                  <input className="input-field" id="title" type="text" placeholder="Entry Title" />
                </div>
                <div className="input-container">
                  <textarea rows="4" className="input-field" id="content" placeholder="Entry content" />
                </div>
                <button type="submit" className="btn" id="file-submit1" onClick="addNewEntry();">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const EntryCard = () => (
  <Link to="#" className="entrygroup">
    <div className="card row-entry">
      <div className="day">
        <h2>Sep 20, 2018</h2>
      </div>
      <div className="entry">
        <h2>1  entry</h2>
      </div>
    </div>
  </Link>
);

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLoggedIn } = this.props;
    console.log(this.props)
    console.log(isLoggedIn)

    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row">
        <div id="mySidenav" className="sidenav">
          {/* <a href="javascript:void(0)" className="closebtn" onClick="closeNav()">&times;</a> */}

          <a href="#" id="profile-pic"><img className="img-center" id="img-element" alt="Avatar" /></a>

          {/* <a id="username" href="#" /> */}
          <hr />
          <a id="entries" href="#">Entries</a>
          <a id="profile" href="#" onClick="userProfile();">User Profile</a>
          <a id="logout-small" href="#" className="logout">Logout</a>
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
              <a id="logout-big" href="#" className="right btn">Logout</a>
            </div>
          </div>

          <div id="app">
            <DashBoard />
            <div className="container">
              <h2>Entries in Days</h2>
              <input type="text" className="input-field" id="search" placeholder="Search" name="search" />
              <EntryCard />
            </div>

          </div>

        </div>
      </div>
    );
  }
}


Index.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.globalreducer.isLoggedIn,
});

export default connect(mapStateToProps)(Index);
