import React, { Component } from 'react';
import './Flashcard.css';

class Flashcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    this.setState(prevState => {
      return { showAnswer: !prevState.showAnswer };
    });
  }

  componentDidUpdate(prevProps) {
    const currentFlashcardId = this.props.flashcard.id;
    const prevFlashCardId = prevProps.flashcard.id;

    if (currentFlashcardId !== prevFlashCardId) {
      this.setState({ showAnswer: false })
    }
  }

  render() {
    const { flashcard } = this.props;
    const { showAnswer } = this.state;

    return (
      <div className="Flashcard well"
        onClick={this.handleClick}
      >
        {!showAnswer ?
          <span className="Flashcard-question">
            {flashcard.question}
          </span> :
          <span className="Flashcard-answer">
            {flashcard.answer}
          </span>
        }
      </div>
    );
  }
}

export default Flashcard;
