import React from 'react';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <section id="right" className="about bg">
          <div id="overlay" className="story-section">
            <h1>My Dairy.</h1>
            <h1>Your space to capture your thoughts and feelings.</h1>
            <p>Getting started is only a few click away.</p>
            <div className="">
              <button type="button" className="btn responsive-btn">Learn more</button>
              <button type="button" className="btn responsive-btn">Login</button>
            </div>
          </div>
        </section>
        <section id="left" className="register container">
          <div className="text-center">
            <h1>My Diary.</h1>
            <h1>Get your thoughts and feelings captured.</h1>
            <p>Getting started is quite simple and easy. Just fill out the info below.</p>
            <form>
              <ul id="errors" className="text-red" />
              <div className="input-container">
                <i className="fa fa-user icon" />
                <input className="input-field" type="text" id="fullname" placeholder="Full name" name="username" />
              </div>
              <div className="input-container">
                <i className="fa fa-envelope icon" />
                <input className="input-field" type="email" placeholder="Email" id="email" name="email" required />
              </div>
              <div className="input-container">
                <i className="fa fa-intersex icon" />
                <select className="input-field" id="gender" name="gender" required>
                  <option value="">Choose your gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <div className="input-container">
                <i className="fa fa-key icon" />
                <input className="input-field" type="password" placeholder="Password" id="password" name="password" required />
              </div>
              <div className="input-container">
                <i className="fa fa-key icon" />
                <input className="input-field" type="password" placeholder="Retype Password" id="retypePassword" name="password" required />
              </div>
              <button type="submit" id="register" className="btn text-center">Register</button>

            </form>
            <p>
                Already have an account?
              <a className="#" href="#">Login</a>
            </p>
          </div>
          <div id="modalBox" className="modal">
            <div className="modal-container">
              <form>
                <div className="imgcontainer">
                  <span>&times;</span>
                  <h2>Login</h2>
                </div>
                <ul id="errors_login" className="text-red" />
                <div className="input-container">
                  <i className="fa fa-envelope icon" />
                  <input className="input-field" id="emailL" type="text" placeholder="Email" name="email" />
                </div>

                <div className="input-container">
                  <i className="fa fa-key icon" />
                  <input className="input-field" id="passwordL" type="password" placeholder="Password" name="password" />
                </div>

                <input type="button" id="login" className="btn" value="Login" />

                <span className="">
Forgot
                  <a href="#">password?</a>
                </span>

              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LandingPage;
