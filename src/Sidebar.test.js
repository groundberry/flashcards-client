import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar'
import Tags from './Tags'


describe('<Sidebar />', () => {
  it('renders a list of tags', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(Tags).length).toEqual(1);
  });
});
