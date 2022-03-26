import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { globalFailure } from '../../actions/globalActions';
import { addNewEntry } from '../../actions/entryActions';
import StartTime from '../../services/time';
import Modal from '../common/Modal';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      title: '',
      content: '',
      isOpen: false
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleCreateEntry = this.handleCreateEntry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateEntry = this.handleCreateEntry.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClearInputs = this.handleClearInputs.bind(this);
  }

  componentDidMount() {
    const { failure } = this.props;
    failure({});
    this._changeTime();
    window.addEventListener('click', (event) => {
      if (event.target.id === 'modalBox') {
        this.toggleModal();
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.toggleModal);
  }

  handleClearInputs() {
    this.setState({ title: '', content: '' });
  }

  toggleModal() {
    this.setState(state => ({ isOpen: !state.isOpen }));
    const { failure } = this.props;
    failure({});
    this.handleClearInputs();
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
    this.toggleModal();
  }

  _changeTime() {
    const { value } = this.state;
    this.setState({ value: value + 1 });
    setTimeout(this._changeTime.bind(this), 1000);
  }

  handleCreateEntry(event) {
    event.preventDefault();
    const {
      title, content
    } = this.state;
    const { failure, token, errors } = this.props;
    if (title.trim() === '' || content.trim() === '') {
      return failure('Please enter the title and the content of the entry');
    }
    const { createEntry } = this.props;
    createEntry({
      title, content
    }, token);
    if (errors && Object.keys(errors).length) {
      this.handleClearInputs();
    }
  }


  render() {
    const { entryPayload, errors } = this.props;
    const { isOpen, title, content } = this.state;
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
        <div>
          <Modal isOpen={isOpen} closeFn={this.toggleModal} className="modal" headerText="Add New Entry">
            <form>
              <ul id="errors_dashboard" className="text-red">
                {
                  errors && typeof errors === 'string'
                    ? <li className="error-list">{errors}</li>
                    : Object.values(errors).map((error, index) => <li className="error-list" key={index}>{error}</li>)
                }
              </ul>
              <div className="input-container">
                <input className="input-field" id="title" value={title} name="title" type="text" placeholder="Entry Title" onChange={this.handleChange} required />
              </div>
              <div className="input-container">
                <textarea rows="4" className="input-field" value={content} name="content" id="content" onChange={this.handleChange} placeholder="Entry content" required />
              </div>
              <button type="submit" className="btn" id="file-submit1" onClick={this.handleCreateEntry}>Save</button>
            </form>
          </Modal>
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
  token: PropTypes.string.isRequired
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
