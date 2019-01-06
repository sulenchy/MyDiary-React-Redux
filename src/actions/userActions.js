import { toastr } from 'react-redux-toastr';
import { REGISTER_SUCCESS } from './actionTypes';
import requestOptions from '../utils/requestOptions';
import { globalLoading, globalLoggedIn, globalFailure } from './globalActions';

const success = userData => ({ type: REGISTER_SUCCESS, userData });

const register = (user, history) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/auth/signup`, requestOptions(user, 'POST', null))
    .then(res => res.json())
    .then((body) => {
      if (body.errors) {
        dispatch(globalFailure(body.errors));
        dispatch(globalLoading(false));
      } else {
        const { userData } = dispatch(success(body));
        localStorage.setItem('user', JSON.stringify(userData));
        toastr.success(userData.status, userData.message);
        history.push('/index');
        dispatch(globalLoading(false));
        return dispatch(globalLoggedIn(true));
      }
    });
};

export default register;
