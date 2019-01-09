import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import globalreducer from './globalReducer';
import userReducer from './userReducer';
import entryReducer from './entryReducer';

export default combineReducers({
  toastr,
  globalreducer,
  userReducer,
  entryReducer
});
