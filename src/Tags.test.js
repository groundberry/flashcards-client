import React from 'react';
import { shallow } from 'enzyme';
import Tags from './Tags';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

describe('<Tags />', () => {
  it('renders a message when there are no tags created', () => {
    const wrapper = shallow(<Tags />);
    expect(wrapper.text()).toEqual('Loading...');
  });

  it('renders a list of clickable tags when there are tags created', () => {
    const wrapper = shallow(<Tags tags={['foo', 'bar']}/>);
    expect(wrapper.find(List).length).toEqual(1);
  });
});
