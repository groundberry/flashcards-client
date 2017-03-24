import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import Login from './Login';
import Main from './Main';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders a login page when no token', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login).length).toEqual(1);
  });

  it('renders a main page when token', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ token: 'foo' });
    expect(wrapper.find(Main).length).toEqual(1);
  });
});
