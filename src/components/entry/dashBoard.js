import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StartTime from '../../services/time';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleModal = this.handleModal.bind(this);
    this._changeTime();
  }

  handleModal() {
    const modal = document.getElementById('modalBox');
    if (modal.style.display !== 'block') {
      modal.style.display = 'block';
    } else {
      modal.style.display = 'none';
    }
  }

  _changeTime() {
    const { value } = this.state;
    this.setState({ value: value + 1 });
    setTimeout(this._changeTime.bind(this), 1000);
  }


  render() {
    const { entryPayload } = this.props;
    return (
      <div id="dashboard" className="container">
        <div className="card-dash col-1-3">
          <h2>Total entry</h2>
          <h2>{entryPayload.payload.length}</h2>
        </div>
        <div className="card-dash col-1-3">
          <h2>Add New</h2>
          <h2>
            <Link to="#" onClick={this.handleModal}><i className="fas fa-plus-circle" id="add-new" /></Link>
          </h2>
        </div>
        <div className="card-dash col-1-3">
          <h2 id="txt">{StartTime()}</h2>
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

DashBoard.propTypes = {
  entryPayload: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.globalreducer.isLoggedIn,
  payload: state.userReducer.payload,
  entryPayload: state.entryReducer
});

export default connect(mapStateToProps)(DashBoard);
