import React, { Component } from 'react';
import Flashcard from './Flashcard';
import Button from 'react-toolbox/lib/button/Button';
import './Flashcards.css';

class Flashcards extends Component {
  renderFlashcards() {
    if (this.props.tag == null) {
      return 'Select a tag on the left!';
    }

    if (this.props.flashcards == null) {
      return 'Loading...';
    }

    if (this.props.flashcards.length === 0) {
      return 'Add a flashcard for this tag!';
    }

    const {
      flashcards,
      selectedFlashcard,
      onClickPreviousFlashcard,
      onClickNextFlashcard
     } = this.props;
    const currentFlashcard = flashcards[selectedFlashcard];

    return (
      <div className='Flashcards-content'>
        <div className='Flashcards-button'>
          <Button icon='keyboard_arrow_left' floating
            disabled={selectedFlashcard === 0}
            onClick={onClickPreviousFlashcard}
          />
        </div>
        <Flashcard
          flashcard={currentFlashcard}
        />
        <div className='Flashcards-button'>
          <Button icon='keyboard_arrow_right' floating
            disabled={selectedFlashcard === flashcards.length - 1}
            onClick={onClickNextFlashcard}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='Flashcards'>
        {this.renderFlashcards()}
      </div>
    );
  }
}

export default Flashcards;
