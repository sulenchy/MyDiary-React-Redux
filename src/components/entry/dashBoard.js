import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { globalFailure } from '../../actions/globalActions';
import { addNewEntry } from '../../actions/entryActions';
import StartTime from '../../services/time';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      title: '',
      content: ''
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleCreateEntry = this.handleCreateEntry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateEntry = this.handleCreateEntry.bind(this);
    this._changeTime();
  }

  componentDidMount() {
    const { failure } = this.props;
    failure({});
  }

  /**
   * @description - handles onchange event
   * @param {*} event -
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
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

  handleCreateEntry(event) {
    event.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('user')).data;
    const {
      title, content
    } = this.state;
    const { failure } = this.props;
    if (title.trim() === '' || content.trim() === '') {
      return failure('Please enter the title and the content of the entry');
    }
    const { createEntry } = this.props;
    createEntry({
      title, content
    }, token);
  }


  render() {
    const { entryPayload, errors } = this.props;
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
                <ul id="errors_login" className="text-red">
                  {
                  errors && typeof errors === 'string'
                    ? <li>{errors}</li> : ''
                }
                </ul>
                <div className="input-container">
                  <input className="input-field" id="title" name="title" type="text" placeholder="Entry Title" onChange={this.handleChange} required />
                </div>
                <div className="input-container">
                  <textarea rows="4" className="input-field" name="content" id="content" onChange={this.handleChange} placeholder="Entry content" />
                </div>
                <button type="submit" className="btn" id="file-submit1" onClick={this.handleCreateEntry}>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashBoard.propTypes = {
  entryPayload: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  failure: PropTypes.func.isRequired,
  createEntry: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  isLoggedIn: state.globalreducer.isLoggedIn,
  payload: state.userReducer.payload,
  entryPayload: state.entryReducer,
  errors: state.globalreducer.error,
});
export const mapDispatchToProps = dispatch => ({
  failure: error => dispatch(globalFailure(error)),
  createEntry: (entry, token) => {
    dispatch(addNewEntry(entry, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
