import React, { Component } from 'react';
import Flashcard from './Flashcard';
import './Flashcards.css';

class Flashcards extends Component {
  renderFlashcards() {
    if (this.props.tag == null) {
      return 'Select a tag on the left!';
    }

    if (this.props.flashcards == null) {
      return 'Loading...';
    }

    const {
      flashcards,
      selectedFlashcard,
      onClickPreviousFlashcard,
      onClickNextFlashcard
     } = this.props;
    const currentFlashcard = flashcards[selectedFlashcard];

    return (
      <div className="Flashcards">
        <button
          className="Flashcards-arrow-button"
          disabled={selectedFlashcard === 0}
          onClick={onClickPreviousFlashcard}
        >
          &lt;
        </button>
        <Flashcard
          flashcard={currentFlashcard}
        />
        <button
          className="Flashcards-arrow-button"
          disabled={selectedFlashcard === flashcards.length - 1}
          onClick={onClickNextFlashcard}
        >
          &gt;
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="Flashcards">
        {this.renderFlashcards()}
      </div>
    );
  }
}

export default Flashcards;
