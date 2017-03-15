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

    return (
      <ul className="Flashcards--list">
        {this.props.flashcards.map((flashcard, index) =>
          <Flashcard
            key={index}
            flashcard={flashcard}
          />
        )}
      </ul>
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
