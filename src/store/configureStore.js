import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = composeWithDevTools({});


const configureStore = () => createStore(
  composeEnhancers(applyMiddleware(thunk, logger)),
);


export default configureStore;
