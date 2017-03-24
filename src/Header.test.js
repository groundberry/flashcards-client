import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';

describe('<Header />', () => {
  it('renders an app bar', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(AppBar).length).toEqual(1);
  });

  it('renders a navigation bar', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(Navigation).length).toEqual(1);
  });

  it('renders an about link', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(Link).length).toEqual(1);
  });
});
