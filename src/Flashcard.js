import React, { Component } from 'react';
import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import './Flashcard.css';

class Flashcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false
    };

    this.handleClickFlip = this.handleClickFlip.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickFlip() {
    this.setState(prevState => {
      return { showAnswer: !prevState.showAnswer };
    });
  }

  handleClickDelete() {
    this.props.onClickDelete(this.props.flashcard);
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
      <Card className='Flashcard'>
        <CardText>
          {!showAnswer ?
            <div className='Flashcard-question'>
              {flashcard.question}
            </div> :
            <div className='Flashcard-answer'>
              {flashcard.answer}
            </div>
          }
        </CardText>
        <CardActions className='Flashcard-actions'>
          <Button
            icon='replay'
            label='Flip'
            onClick={this.handleClickFlip}
          />
          <Button
            icon='delete'
            label='Delete'
            onClick={this.handleClickDelete}
          />
        </CardActions>
      </Card>
    );
  }
}

export default Flashcard;
