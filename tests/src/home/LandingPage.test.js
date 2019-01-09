import React from 'react';
import { shallow } from 'enzyme';
// import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
// import { BrowserRouter as Router } from 'react-router-dom';
import connectedLandingPage, { LandingPage, mapDispatchToProps, mapStateToProps } from '../../../src/components/home/LandingPage';

const middlewares = [thunk];

const initialState = {
  global: {
    isLoading: false,
    isLoggedIn: false,
    error: {}
  },
};

function setup() {
  const props = {
    isLoggedIn: false,
    errors: {},
    failure: jest.fn,
    history: {},
    registerUser: jest.fn()
  };

  const mockStore = configureMockStore();

  const store = mockStore(initialState);
  const connectedLandingWrapper = shallow(<connectedLandingPage {...props} store={store} />);

  const landingPage = shallow(<LandingPage {...props} />);

  return {
    props,
    connectedLandingWrapper,
    landingPage
  };
}

const { connectedLandingWrapper } = setup();
const { landingPage } = setup();

describe('Testing connectedArticlePage', () => {
  test('shallow test', () => {
    expect(connectedLandingWrapper).toMatchSnapshot();
  });

  test('testing mapStateToProps', () => {
    const innerState = {
      globalreducer: {
        isLoggedIn: false,
        error: {}
      }
    };
    expect(mapStateToProps(innerState)).toEqual({
      isLoggedIn: false,
      errors: {}
    });
  });

  test('testing mapDispatchToProps', () => {
    const dispatch = jest.fn(() => {});
    mapDispatchToProps(dispatch).registerUser({});
    expect(dispatch.mock.calls.length).toBe(1);
  });
  test('testing mapDispatchToProps', () => {
    const dispatch = jest.fn(() => {});
    mapDispatchToProps(dispatch).failure({});
    expect(dispatch.mock.calls.length).toBe(1);
  });
});

describe('testing unconnected component', () => {
  test('shallow test', () => {
    expect(landingPage).toMatchSnapshot();
    landingPage.instance().handleChange({ preventDefault: jest.fn(), target: { name: 'email', value: 'sulenchy@yahoo.com' } });
  });
});
