import initialState from '../store/initialState';
import { GET_USER_ENTRIES } from '../actions/actionTypes';

const { entry } = initialState;

const entryReducer = (state = entry, action) => {
  const { type } = action;
  switch (type) {
    case GET_USER_ENTRIES:
      return {
        ...state, payload: action.entryData
      };
    default:
      return state;
  }
};

export default entryReducer;
