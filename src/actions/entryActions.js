import { GET_USER_ENTRIES } from './actionTypes';
import requestOptions from '../utils/requestOptions';
import { globalLoading, globalFailure } from './globalActions';


const entrySuccess = entryData => ({ type: GET_USER_ENTRIES, entryData });


const getUserEntries = token => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/entries`, requestOptions(null, 'GET', token))
    .then(
      res => res.json()
    )
    .then((body) => {
      if (body.status === 'failure') {
        dispatch(globalFailure(body.message));
        dispatch(globalLoading(false));
      } else {
        dispatch(entrySuccess(body));
        dispatch(globalLoading(false));
      }
    });
};

export default getUserEntries;
