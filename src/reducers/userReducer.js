import initialState from '../store/initialState';
import {
  GET_USER_INFO, UPDATE_USER_INFO
} from '../actions/actionTypes';

const { userData } = initialState;
const userReducer = (state = userData, action) => {
  const { type } = action;
  switch (type) {
    case GET_USER_INFO:
      return {
        ...state, userData: action.userData
      };
    case UPDATE_USER_INFO:
      return {
        ...state, userData: action.userData
      };
    default:
      return state;
  }
};

export default userReducer;
