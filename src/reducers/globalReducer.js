import initialState from '../store/initialState';
import {
  TRIGGER_LOGGEDIN,
  TRIGGER_FAILURE,
  TRIGGER_LOADING,
} from '../actions/actionTypes';

const { global } = initialState;
const globalReducer = (state = global, action) => {
  const { type } = action;
  switch (type) {
    case TRIGGER_LOGGEDIN:
      return {
        ...state, isLoggedIn: action.isLoggedIn
      };
    case TRIGGER_FAILURE:
      return {
        ...state, isLoading: action.isLoading, error: action.error
      };
    case TRIGGER_LOADING:
      return {
        ...state, isLoading: action.isLoading
      };
    default:
      return state;
  }
};

export default globalReducer;
