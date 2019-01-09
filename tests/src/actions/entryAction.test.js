import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { globalLoading, globalFailure } from '../../../src/actions/globalActions';
import {
  ADD_NEW_ENTRY_SUCCESS,
  GET_USER_ENTRIES,
} from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should get all user diary entry', () => {
    fetchMock.getOnce(`${process.env.API_BASE_URL}/entries`, {
      body: { entries: {} },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
    ];

    const store = mockStore({ todos: [] });
    
  });
});
