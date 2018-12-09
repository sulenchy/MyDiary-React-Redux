import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers'
import App from './components/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger({});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)