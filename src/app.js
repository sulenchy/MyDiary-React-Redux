import { PersistGate } from 'redux-persist/integration/react';
import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from './components/NotFound';
import { persistor, store } from './store/store';
import routes from './routes';

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
            </Fragment>
          </Router>
        </PersistGate>

      </Provider>
    );
  }
}

export default App;
