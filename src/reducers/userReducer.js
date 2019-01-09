import initialState from '../store/initialState';
import {
  GET_USER_INFO, UPDATE_USER_INFO, REGISTER_SUCCESS
} from '../actions/actionTypes';

const { user } = initialState;
const userReducer = (state = user, action) => {
  const { type } = action;
  switch (type) {
    case GET_USER_INFO:
      return {
        ...state, payload: action.userData
      };
    case UPDATE_USER_INFO:
      return {
        ...state, payload: action.userData
      };
    case REGISTER_SUCCESS:
      return {
        ...state, payload: action.userData
      };
    default:
      return state;
  }
};

export default userReducer;
