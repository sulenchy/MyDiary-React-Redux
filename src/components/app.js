import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr';
import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from './NotFound';
import Spinner from './common/spinner';
import { persistor, store } from '../store/store';
import routes from '../routes';
import '../styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Fragment>
              <Spinner />
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
        </PersistGate>

      </Provider>
    );
  }
}

export default App;
