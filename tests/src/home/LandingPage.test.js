import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import connectedLandingPage, { LandingPage, mapDispatchToProps, mapStateToProps } from '../../../src/components/home/LandingPage';

Enzyme.configure({ adapter: new Adapter() });

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
    registerUser: jest.fn(),
    loginUser: jest.fn()
  };

  const mockStore = configureMockStore();

  const store = mockStore(initialState);
  const connectedLandingWrapper = shallow(<connectedLandingPage {...props} store={store} />);

  const landingPage = mount(<LandingPage {...props} />, { attachTo: document.body });

  return {
    props,
    connectedLandingWrapper,
    landingPage
  };
}

const { connectedLandingWrapper } = setup();
const { landingPage } = setup();

describe('Testing connectedArticlePage', () => {
  it('shallow test', () => {
    expect(connectedLandingWrapper).toMatchSnapshot();
  });

  it('testing mapStateToProps', () => {
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

  it('testing mapDispatchToProps', () => {
    const dispatch = jest.fn(() => {});
    mapDispatchToProps(dispatch).registerUser({});
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it('testing mapDispatchToProps', () => {
    const dispatch = jest.fn(() => {});
    mapDispatchToProps(dispatch).failure({});
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it('testing mapDispatchToProps', () => {
    const dispatch = jest.fn(() => {});
    mapDispatchToProps(dispatch).loginUser({});
    expect(dispatch.mock.calls.length).toBe(1);
  });
});

describe('testing unconnected component 1', () => {
  it('shallow test', () => {
    expect(landingPage).toMatchSnapshot();
    landingPage.instance().handleChange({ preventDefault: jest.fn(), target: { name: 'email', value: 'sulenchy@yahoo.com' } });
  });
});

describe('testing unconnected component 2', () => {
  it('testing handleModal', () => {
    const button = landingPage.find('#handelModal');
    button.props().onClick('');
    const openLogin = landingPage.find('#openLogin');
    openLogin.props().onClick('');
    const closeLoginModal = landingPage.find('#closeLoginModal');
    closeLoginModal.props().onClick('');
  });

  it('testing handleRegister', () => {
    const buttonRegister = landingPage.find('#register');
    buttonRegister.props().onClick({ preventDefault: jest.fn() });
  });

  it('testing handleLogin', () => {
    const buttonLogin = landingPage.find('#login');
    buttonLogin.props().onClick({ preventDefault: jest.fn() });
  });
});
