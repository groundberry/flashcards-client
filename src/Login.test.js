import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import LoginButton from './LoginButton';

describe('<Login />', () => {
  it('renders name of the app', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.containsMatchingElement(
      <h2 className="Login-title">
        Flashcards
      </h2>
    )).toEqual(true);
  });

  it('renders a login button', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(LoginButton).length).toEqual(1);
  });
});
