import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  register, logout, getUserInfo, login
} from '../../../src/actions/userActions';
import {
  REGISTER_SUCCESS,
  TRIGGER_LOADING,
} from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userDetails = {
  fullname: 'do something',
  email: 'aghs@hghd.com',
  gender: 'male',
  password: '12345678'
};

const history = {
  push: jest.fn()
};

const token = 'hgdgbbhdgv.dgfvdv.edyfd';

describe('UserAction test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates REGISTER_SUCCESS', (done) => {
    fetchMock.post(`${process.env.API_BASE_URL}/auth/signup`, {
      body: userDetails,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { isLoading: true, type: 'TRIGGER_LOADING' },
      { type: REGISTER_SUCCESS, userData: userDetails },
      { isLoading: false, type: TRIGGER_LOADING },
      { isLoggedIn: true, type: 'TRIGGER_LOGGEDIN' }
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(register(userDetails, history)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('fail to creates on REGISTER_FAILURE', (done) => {
    const mockResponse = {
      errors: 'User cannot be created'
    };

    fetchMock.post(`${process.env.API_BASE_URL}/auth/signup`, {
      body: mockResponse,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { isLoading: true, type: 'TRIGGER_LOADING' },
      { error: 'User cannot be created', isLoading: false, type: 'TRIGGER_FAILURE' }
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(register(userDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('testing logout action creator', () => {
    const expectedActions = [
      { isLoading: true, type: 'TRIGGER_LOADING' },
      { isLoggedIn: false, type: 'TRIGGER_LOGGEDIN' },
      { isLoading: false, type: TRIGGER_LOADING },
    ];

    const store = mockStore({ global: {} });

    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  const entry = {};
  it('testing getUserInfo actionCreator on successs', (done) => {
    fetchMock.getOnce(`${process.env.API_BASE_URL}/user`, {
      body: entry,
      headers: { 'content-type': 'application/json', token }
    });

    const expectedActions = [
      { isLoading: true, type: 'TRIGGER_LOADING' },
      { type: 'GET_USER_INFO', userData: { } },
      { isLoading: false, type: 'TRIGGER_LOADING' }
    ];

    const store = mockStore({ entry: {} });

    return store.dispatch(getUserInfo()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('testing getUserInfo actionCreator on failure', (done) => {
    const mockResponse = {
      status: 'failure',
      errors: 'User is unauthorised'
    };

    fetchMock.getOnce(`${process.env.API_BASE_URL}/user`, {
      body: mockResponse,
      headers: { 'content-type': 'application/json', }
    });

    const expectedActions = [
      { isLoading: true, type: 'TRIGGER_LOADING' },
      { error: undefined, isLoading: false, type: 'TRIGGER_FAILURE' }
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(getUserInfo()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('tesing login action action creator on success', (done) => {
    fetchMock.post(`${process.env.API_BASE_URL}/auth/login`, {
      body: userDetails,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { isLoading: true, type: 'TRIGGER_LOADING' },
      { type: REGISTER_SUCCESS, userData: userDetails },
      { isLoading: false, type: TRIGGER_LOADING },
      { isLoggedIn: true, type: 'TRIGGER_LOGGEDIN' }
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(login(userDetails, history)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('tesing login action action creator on failure', (done) => {
    fetchMock.post(`${process.env.API_BASE_URL}/auth/login`, {
      body: { status: 'failure' },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { isLoading: true, type: 'TRIGGER_LOADING' },
      { error: undefined, isLoading: false, type: 'TRIGGER_FAILURE' }
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(login(userDetails, history)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
