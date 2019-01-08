import { toastr } from 'react-redux-toastr';
import { REGISTER_SUCCESS, GET_USER_INFO } from './actionTypes';
import requestOptions from '../utils/requestOptions';
import { globalLoading, globalLoggedIn, globalFailure } from './globalActions';

const success = userData => ({ type: REGISTER_SUCCESS, userData });
const userInfoSuccess = () => ({ type: GET_USER_INFO });

export const register = (user, history) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/auth/signup`, requestOptions(user, 'POST', null))
    .then(res => res.json())
    .then((body) => {
      if (body.errors) {
        dispatch(globalFailure(body.errors));
        dispatch(globalLoading(false));
      } else {
        const { userData } = dispatch(success(body));
        // localStorage.setItem('user', JSON.stringify(userData));
        toastr.success(userData.status, userData.message);
        history.push('/index');
        dispatch(globalLoading(false));
        return dispatch(globalLoggedIn(true));
      }
    });
};

export const getUserInfo = () => (dispatch) => {
  dispatch(globalLoading(true));
  const { token } = localStorage.getItem('user');
  console.log(token, 'token from getUserInfo');
  return fetch(`${process.env.API_BASE_URL}/user`, requestOptions(null, 'GET', token))
    .then(
      res => res.json()
    )
    .then((body) => {
      if (body.status === 'failure') {
        dispatch(globalFailure(body.message));
        dispatch(globalLoading(false));
      } else {
        dispatch(userInfoSuccess());
        dispatch(globalLoading(false));
      }
    });
};

export const login = (user, history) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/auth/login`, requestOptions(user, 'POST', null))
    .then(res => res.json())
    .then((body) => {
      console.log(body);
      if (body.status === 'failure') {
        dispatch(globalFailure(body.message));
        dispatch(globalLoading(false));
      } else {
        const { userData } = dispatch(success(body));
        localStorage.setItem('user', JSON.stringify(userData));
        toastr.success(userData.status, userData.message);
        dispatch(globalLoading(false));
        dispatch(globalLoggedIn(true));
        return history.push('/index');
      }
    });
};
