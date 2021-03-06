import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { globalFailure } from '../../actions/globalActions';
import { register, login } from '../../actions/userActions';

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      gender: '',
      password: '',
      retypePassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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

  /**
   * @description - handle onClick event of the modal button
   */
  handleModal(param) {
    document.getElementById('modalBox').style.display = param;
  }

  /**
   * @description - handles onClick event of the register form
   * @param {*} event -
   */
  handleRegister(event) {
    event.preventDefault();
    const {
      email, fullname, gender, password, retypePassword
    } = this.state;
    if (password !== retypePassword) {
      return '';
    }
    const { registerUser, history } = this.props;
    registerUser({
      fullname, email, password, gender
    }, history);
  }

  /**
   * @description - handles onClick event of the register form
   * @param {*} event -
   */
  handleLogin(event) {
    event.preventDefault();
    const {
      email, password
    } = this.state;
    const { failure } = this.props;
    if (email.trim() === '' || password.trim() === '') {
      return failure('Please provide email and password!');
    }
    const { loginUser, history } = this.props;
    loginUser({
      email, password
    }, history);
  }

  render() {
    const { isLoggedIn, errors } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/index" />;
    }

    return (
      <div className="main">
        <section id="right" className="about bg">
          <div id="overlay" className="story-section">
            <h1>My Dairy.</h1>
            <h1>Your space to capture your thoughts and feelings.</h1>
            <p>Getting started is only a few click away.</p>
            <div className="">
              <button type="button" className="btn responsive-btn">Learn more</button>
              <button type="button" className="btn responsive-btn" onClick={() => this.handleModal('block')}>Login</button>
            </div>
          </div>
        </section>
        <section id="left" className="register container">
          <div className="text-center">
            <h1>My Diary.</h1>
            <h1>Get your thoughts and feelings captured.</h1>
            <p>Getting started is quite simple and easy. Just fill out the info below.</p>
            <form>
              <ul id="errors" className="text-red">
                {errors && typeof errors !== 'string' ? Object.keys(errors).map((error, index) => (
                  <li key={`error-${String(index)}`}>{errors[error][0]}</li>
                )) : ''}
              </ul>
              <div className="input-container">
                <i className="fa fa-user icon" />
                <input className="input-field" type="text" id="fullname" placeholder="Full name" name="fullname" onChange={this.handleChange} />
              </div>
              <div className="input-container">
                <i className="fa fa-envelope icon" />
                <input className="input-field" type="email" placeholder="Email" id="email" name="email" onChange={this.handleChange} required />
              </div>
              <div className="input-container">
                <i className="fa fa-intersex icon" />
                <select className="input-field" id="gender" name="gender" onChange={this.handleChange} required>
                  <option value="">Choose your gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <div className="input-container">
                <i className="fa fa-key icon" />
                <input className="input-field" type="password" placeholder="Password" id="password" name="password" onChange={this.handleChange} required />
              </div>
              <div className="input-container">
                <i className="fa fa-key icon" />
                <input className="input-field" type="password" placeholder="Retype Password" id="retypePassword" name="retypePassword" onChange={this.handleChange} required />
              </div>
              <button type="submit" id="register" className="btn text-center" onClick={this.handleRegister}>Register</button>

            </form>
            <p>
                Already have an account?
              <a className="#" href="#" onClick={() => this.handleModal('block')}>Login</a>
            </p>
          </div>
        </section>
        <div id="modalBox" className="modal">
          <div className="modal-container">
            <form>
              <div className="imgcontainer">
                <button type="button" className="close" onClick={() => this.handleModal('none')}>&times;</button>
                <h2>Login</h2>
              </div>
              <ul id="errors_login" className="text-red">
                {
                  errors && typeof errors === 'string'
                    ? <li>{errors}</li> : ''
                }
              </ul>

              <div className="input-container">
                <i className="fa fa-envelope icon" />
                <input className="input-field" type="email" placeholder="Email" name="email" onChange={this.handleChange} required />
              </div>

              <div className="input-container">
                <i className="fa fa-key icon" />
                <input className="input-field" type="password" placeholder="Password" name="password" onChange={this.handleChange} required />
              </div>

              <input type="submit" id="login" className="btn" value="Login" onClick={this.handleLogin} />
              <span className="">
Forgot
                <a href="#">password?</a>
              </span>

            </form>
          </div>
        </div>

      </div>
    );
  }
}

LandingPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  failure: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  isLoggedIn: state.globalreducer.isLoggedIn,
  errors: state.globalreducer.error,
});

export const mapDispatchToProps = dispatch => ({
  failure: error => dispatch(globalFailure(error)),
  registerUser: (user, history) => {
    dispatch(register(user, history));
  },
  loginUser: (user, history) => {
    dispatch(login(user, history));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
