import React, { Component } from 'react';
import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import Markdown from './Markdown';
import './Flashcard.css';

class Flashcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false
    };

    this.handleClickFlip = this.handleClickFlip.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickFlip() {
    this.setState(prevState => {
      return { showAnswer: !prevState.showAnswer };
    });
  }

  handleClickEdit() {
    this.props.onClickEdit(this.props.flashcard);
  }

  handleClickDelete() {
    if (confirm('Are you sure you want to delete it?')){
      this.props.onClickDelete(this.props.flashcard);
    }
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
        <IconMenu
          icon='more_vert'
          menuRipple
          className='Flashcard-menu'
        >
          <MenuItem
            value='edit'
            icon='edit'
            caption='Edit'
            onClick={this.handleClickEdit}
          />
          <MenuDivider />
          <MenuItem
            value='signout'
            icon='delete'
            caption='Delete'
            onClick={this.handleClickDelete}
          />
        </IconMenu>
        <CardText>
          {!showAnswer ?
            <div className='Flashcard-question'>
              <Markdown source={flashcard.question} />
            </div> :
            <div className='Flashcard-answer'>
              <Markdown source={flashcard.answer} />
            </div>
          }
        </CardText>
        <CardActions className='Flashcard-actions'>
          <Button
            icon='replay'
            label='Flip'
            onClick={this.handleClickFlip}
          />
        </CardActions>
      </Card>
    );
  }
}

export default Flashcard;
