import { toastr } from 'react-redux-toastr';
import { REGISTER_SUCCESS, GET_USER_INFO } from './actionTypes';
import requestOptions from '../utils/requestOptions';
import { globalLoading, globalLoggedIn, globalFailure } from './globalActions';
import { entrySuccess } from './entryActions';

import { persistor } from '../store/store';

const success = userData => ({ type: REGISTER_SUCCESS, userData });
const userInfoSuccess = userData => ({ type: GET_USER_INFO, userData });

export const register = (user, history) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/auth/signup`, requestOptions(user, 'POST', null))
    .then(res => res.json())
    .then((body) => {
      if (body.errors) {
        dispatch(globalFailure(body.errors));
      } else {
        const userObject = {
          ...body.user
        };
        localStorage.setItem('user', JSON.stringify(userObject));
        dispatch(success(body));
        dispatch(globalLoading(false));
        dispatch(globalLoggedIn(true));
        toastr.success('New user', 'You are successfully signed up');
        return history.push('/index');
      }
    });
};

export const login = (user, history) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/auth/login`, requestOptions(user, 'POST', null))
    .then(res => res.json())
    .then((body) => {
      if (body.status === 'failure') {
        dispatch(globalFailure(body.message));
      } else {
        const userObject = {
          ...body.data.user,
          token: body.data.token,
        };
        localStorage.setItem('user', JSON.stringify(userObject));
        dispatch(success(body));
        dispatch(globalLoading(false));
        dispatch(globalLoggedIn(true));
        toastr.success('Welcome', 'You are successfully logged in');
        return history.push('/index');
      }
    });
};


export const logout = history => (dispatch) => {
  dispatch(globalLoading(true));
  localStorage.clear();
  persistor.purge();
  dispatch(globalLoggedIn(false));
  dispatch(userInfoSuccess({}));
  dispatch(entrySuccess({}));
  dispatch(globalLoading(false));
  history.push('/');
};

export const getUserInfo = token => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/user`, requestOptions(null, 'GET', token))
    .then(
      res => res.json()
    )
    .then((body) => {
      if (body.status === 'failure') {
        dispatch(globalFailure(body.message));
      } else {
        dispatch(userInfoSuccess(body));
        dispatch(globalLoading(false));
      }
    });
};
