import ReduxToastr from 'react-redux-toastr';
import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserInfo, logout } from '../actions/userActions';
import NotFound from './NotFound';
import Spinner from './common/spinner';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import routes from '../routes';
import '../styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarShown: false,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const {
      retrieveUserInfo
    } = this.props;
    const { token = '' } = JSON.parse(localStorage.getItem('MY_DIARY_USER')) ? JSON.parse(localStorage.getItem('MY_DIARY_USER')).data : {};

    retrieveUserInfo(token);
    this.setState({ isSidebarShown: false });
    window.addEventListener('click', (event) => {
      const { isSidebarShown } = this.state;
      if (event.target.id === 'app' && isSidebarShown) {
        this.toggleSidebar();
      }
    });
  }

  componentDidUpdate() {
    const { isSidebarShown } = this.state;

    if (isSidebarShown) {
      window.addEventListener('click', (event) => {
        if (event.target.id === 'app' && isSidebarShown) {
          this.toggleSidebar();
        }
      });
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
    const { isSidebarShown } = this.state;
    const { payload, isLoggedIn, logoutUser } = this.props;
    return (
      <Router>
        <Fragment>
          <Spinner />
          {
            isLoggedIn ? (
              <div id="root-wrapper" className="row">
                <Sidebar
                  payload={payload}
                  isSidebarShown={isSidebarShown}
                  logoutUser={logoutUser}
                  toggleSidebar={this.toggleSidebar}
                />
                <div className="main-form">
                  <Header toggleSidebar={this.toggleSidebar} logoutUser={logoutUser} userPayload={ payload } />
                  <Switch>
                    {
                      routes.map(route => (
                        <Route
                          exact={route.exact}
                          path={route.path}
                          key={route.path}
                          component={route.component}
                        />
                      ))
                    }
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            )
              : (
                <Switch>
                  {
                  routes.map(route => (
                    <Route
                      exact={route.exact}
                      path={route.path}
                      key={route.path}
                      component={route.component}
                    />
                  ))
                }
                  <Route component={NotFound} />
                </Switch>
              )
          }
          <ReduxToastr
            timeOut={2000}
            newestOnTop
            preventDuplicates
            position="top-right"
            transitionIn="bounceInDown"
            transitionOut="bounceOutUp"
            progressBar
            closeOnToastrClick
          />
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  payload: PropTypes.object.isRequired,
  retrieveUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.globalreducer.isLoggedIn,
  payload: state.userReducer.payload,
});
const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(logout());
  },
  retrieveUserInfo: (token) => {
    dispatch(getUserInfo(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
