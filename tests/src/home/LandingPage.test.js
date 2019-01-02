import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../../../src/components/home/LandingPage';


test('testing Landing Page component', () => {
  const component = shallow(<LandingPage />);
  expect(component).toMatchSnapshot();
});
