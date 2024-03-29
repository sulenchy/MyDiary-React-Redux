import { toastr } from 'react-redux-toastr';
import { GET_USER_ENTRIES, ADD_NEW_ENTRY_SUCCESS } from './actionTypes';
import requestOptions from '../utils/requestOptions';
import { globalLoading, globalFailure } from './globalActions';

const entrySuccess = entryData => ({ type: GET_USER_ENTRIES, entryData });
const addEntrySuccess = entryData => ({ type: ADD_NEW_ENTRY_SUCCESS, entryData });

const getUserEntries = token => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/entries`, requestOptions(null, 'GET', token))
    .then(
      res => res.json()
    )
    .then((body) => {
      if (body.status === 'failure') {
        dispatch(globalFailure(body.message));
      } else {
        dispatch(entrySuccess(body));
        dispatch(globalLoading(false));
      }
    }).catch((err) => {
      dispatch(globalLoading(false));
      return err.message;
    });
};

export const addNewEntry = (entry, token) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/entries`, requestOptions(entry, 'POST', token))
    .then(res => res.json())
    .then((body) => {
      if (body.data.errors) {
        dispatch(globalFailure(body.data.errors));
        toastr.error(body.status);
        return;
      }
      const { entryData } = dispatch(addEntrySuccess(body));
      toastr.success(entryData.status, entryData.message);
      dispatch(globalLoading(false));
    }).catch((err) => {
      dispatch(globalLoading(false));
      return err.message;
    });
};

export default getUserEntries;
