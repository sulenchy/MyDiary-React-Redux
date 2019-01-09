import { toastr } from 'react-redux-toastr';
import { GET_USER_ENTRIES, ADD_NEW_ENTRY_SUCCESS } from './actionTypes';
import requestOptions from '../utils/requestOptions';
import { globalLoading, globalFailure } from './globalActions';


export const entrySuccess = entryData => ({ type: GET_USER_ENTRIES, entryData });
export const addEntrySuccess = entryData => ({ type: ADD_NEW_ENTRY_SUCCESS, entryData });


export const getUserEntries = token => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/entries`, requestOptions(null, 'GET', token))
    .then(
      res => res.json()
    )
    .then((body) => {
      if (body.status === 'failure') {
        dispatch(globalFailure(body.message));
        toastr.error('No Entry', 'No entry. Please add new entry');
      } else {
        dispatch(entrySuccess(body));
        dispatch(globalLoading(false));
      }
    });
};

export const addNewEntry = (entry, token) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/entries`, requestOptions(entry, 'POST', token))
    .then(res => res.json())
    .then((body) => {
      if (body.errors) {
        dispatch(globalFailure(body.errors));
      } else {
        dispatch(addEntrySuccess(body));
        toastr.success('New Entry', 'New entry added successfully');
        dispatch(globalLoading(false));
        dispatch(globalFailure({}));
      }
    });
};

export default getUserEntries;
