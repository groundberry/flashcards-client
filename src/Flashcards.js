import React, { Component } from 'react';
import Flashcard from './Flashcard';
import Button from 'react-toolbox/lib/button/Button';
import Chip from 'react-toolbox/lib/chip/Chip';
import './Flashcards.css';

class Flashcards extends Component {
  renderFlashcards() {
    if (this.props.tagId == null) {
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
      selectedFlashcardIndex,
      onClickPreviousFlashcard,
      onClickNextFlashcard,
      onClickEdit,
      onClickDelete
    } = this.props;

    const currentFlashcard = flashcards[selectedFlashcardIndex];

    return (
      <div className='Flashcards-content'>
        <div className='Flashcards-button'>
          <Button icon='keyboard_arrow_left' floating
            disabled={selectedFlashcardIndex === 0}
            onClick={onClickPreviousFlashcard}
          />
        </div>
        <Flashcard
          flashcard={currentFlashcard}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
        <div className='Flashcards-button'>
          <Button icon='keyboard_arrow_right' floating
            disabled={selectedFlashcardIndex === flashcards.length - 1}
            onClick={onClickNextFlashcard}
          />
        </div>
        <div className='Flashcards-index'>
          <Chip>
            {selectedFlashcardIndex + 1} / {flashcards.length}
          </Chip>
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
