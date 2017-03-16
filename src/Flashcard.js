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

  render() {
    const { flashcard } = this.props;
    const { showAnswer } = this.state;

    return (
      <a className="Flashcard well"
        href="#"
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
      </a>
    );
  }
}

export default Flashcard;
