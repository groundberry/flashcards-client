import React from 'react';
import { shallow } from 'enzyme';
import Tags from './Tags';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListItem from 'react-toolbox/lib/list/ListItem';

describe('<Tags />', () => {
  it('renders a message when no tags', () => {
    const wrapper = shallow(<Tags />);
    expect(wrapper.text()).toEqual('Loading...');
  });

  it('renders a list of tags when there are tags', () => {
    const wrapper = shallow(<Tags tags={['foo', 'bar']}/>);
    expect(wrapper.find(List).length).toEqual(1);
  });

  it('renders a list of two tags', () => {
    const wrapper = shallow(<Tags tags={['foo', 'bar']}/>);
    expect(wrapper.find(ListItem).length).toEqual(2);
  });

  it('allows clicking on a tag', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Tags tags={['foo']} onClickTag={spy} />);
    wrapper.find(ListItem).simulate('click');
    expect(spy).toBeCalledWith('foo');
  });
});
