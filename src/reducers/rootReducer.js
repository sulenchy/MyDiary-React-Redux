import { combineReducers } from 'redux';
import globalreducer from './globalReducer';
import userReducer from './userReducer';

export default combineReducers({
  globalreducer,
  userReducer
});
