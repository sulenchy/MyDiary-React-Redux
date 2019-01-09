import { combineReducers } from 'redux';
import globalreducer from './globalReducer';
import userReducer from './userReducer';
import entryReducer from './entryReducer';

export default combineReducers({
  globalreducer,
  userReducer,
  entryReducer
});
