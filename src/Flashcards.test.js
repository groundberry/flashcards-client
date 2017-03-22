import React from 'react';
import { mount, shallow } from 'enzyme';
import Flashcards from './Flashcards';
import Flashcard from './Flashcard';

describe('<Flashcards />', () => {
  it('renders a message when no tags', () => {
    const wrapper = shallow(<Flashcards />);
    expect(wrapper.text()).toEqual('Select a tag on the left!');
  });

  it('renders a message when no flashcards', () => {
    const wrapper = shallow(<Flashcards tag='foo' />);
    expect(wrapper.text()).toEqual('Loading...');
  });

  it('renders a message when tag and empty flashcards', () => {
    const wrapper = shallow(<Flashcards tag='foo' flashcards={[]} />);
    expect(wrapper.text(Flashcard)).toEqual('Add a flashcard for this tag!');
  });

  it('renders a flashcard when tag and non-empty flashcards', () => {
    const wrapper = shallow(
      <Flashcards
        tag='foo'
        flashcards={[{
          question: 'QQ',
          answer: 'AA'
        }]}
      />);
    expect(wrapper.find(Flashcard).length).toEqual(1);
  });
});
