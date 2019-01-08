import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  globalFailure,
  globalLoggedIn,
  globalLoading
} from '../../../src/actions/globalActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('GLOBAL ACTIONS', () => {
  it('GLOBAL FAILURE', () => {
    const expectedActions = [
      {
        type: 'TRIGGER_FAILURE', isLoading: false
      }
    ];
    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: true,
        error: []
      }
    });

    store.dispatch(globalFailure());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('GLOBAL LOGGEDOUT', () => {
    const expectedActions = [
      {
        type: 'TRIGGER_LOGGEDIN', isLoggedIn: false
      }
    ];
    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: []
      }
    });

    store.dispatch(globalLoggedIn(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('GLOBAL REQUEST', () => {
    const expectedActions = [
      {
        type: 'TRIGGER_LOADING', isLoading: true
      }
    ];
    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: []
      }
    });

    store.dispatch(globalLoading(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('GLOBAL REQUEST', () => {
    const expectedActions = [
      {
        type: 'TRIGGER_LOADING', isLoading: false
      }
    ];
    const store = mockStore({
      global: {
        isLoading: true,
        isLoggedIn: false,
        error: []
      }
    });

    store.dispatch(globalLoading(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('GLOBAL LOGGEDIN', () => {
    const expectedActions = [
      {
        type: 'TRIGGER_LOGGEDIN', isLoggedIn: true
      }
    ];
    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: []
      }
    });

    store.dispatch(globalLoggedIn(true));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
