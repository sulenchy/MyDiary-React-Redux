import {
  TRIGGER_LOGGEDIN,
  TRIGGER_FAILURE,
  TRIGGER_LOADING
} from './actionTypes';

export const globalLoading = isLoading => ({
  type: TRIGGER_LOADING,
  isLoading
});

export const globalFailure = error => ({
  type: TRIGGER_FAILURE,
  isLoading: false,
  error
});

export const globalLoggedIn = isLoggedIn => ({
  type: TRIGGER_LOGGEDIN,
  isLoggedIn
});
