import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import Header from './Header';
import Sidebar from './Sidebar';
import Flashcards from './Flashcards';
import FlashcardDialog from './FlashcardDialog';
import * as utils from './utils';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: null,
      selectedTag: null,
      flashcards: null,
      selectedFlashcard: null,
      showDialog: false
    };

    this.handleClickTag = this.handleClickTag.bind(this);
    this.handleClickPreviousFlashcard = this.handleClickPreviousFlashcard.bind(this);
    this.handleClickNextFlashcard = this.handleClickNextFlashcard.bind(this);
    this.handleSaveFlashcardDialog = this.handleSaveFlashcardDialog.bind(this);
    this.handleToggleFlashcardDialog = this.handleToggleFlashcardDialog.bind(this);
  }

  handleClickTag(tag) {
    this.setState({ selectedTag: tag.id });
  }

  handleClickPreviousFlashcard() {
    this.setState(prevState => {
      return {
        selectedFlashcard: Math.max(0, prevState.selectedFlashcard - 1)
      };
    });
  }

  handleClickNextFlashcard() {
    this.setState(prevState => {
      return {
        selectedFlashcard: Math.min(prevState.selectedFlashcard + 1, prevState.flashcards.length - 1)
      };
    });
  }

  handleSaveFlashcardDialog(flashcard) {
    this.createFlashcard(flashcard);
  }

  handleToggleFlashcardDialog() {
    this.setState(prevState => {
      return {
        showDialog: !prevState.showDialog
      };
    });
  }

  componentDidMount() {
    this.fetchTags();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentTag = this.state.selectedTag;
    const prevTag = prevState.selectedTag;

    if (currentTag === prevTag || currentTag == null) {
      return;
    }

    this.fetchFlashcards(currentTag);
  }

  render() {
    const {
      tags,
      selectedTag,
      flashcards,
      selectedFlashcard,
      showDialog
    } = this.state;

    return (
      <div className='Main'>
        <Header />
        <div className='Main-content'>
          <Sidebar
            tags={tags}
            onClickTag={this.handleClickTag}
          />
          <Flashcards
            tag={selectedTag}
            flashcards={flashcards}
            selectedFlashcard={selectedFlashcard}
            onClickPreviousFlashcard={this.handleClickPreviousFlashcard}
            onClickNextFlashcard={this.handleClickNextFlashcard}
          />
          <div className='Main-button'>
            <Button
              icon='add'
              floating
              accent
              onClick={this.handleToggleFlashcardDialog}
            />
          </div>
        </div>
        <FlashcardDialog
          tags={tags}
          active={showDialog}
          onSave={this.handleSaveFlashcardDialog}
          onCancel={this.handleToggleFlashcardDialog}
        />
      </div>
    );
  }

  fetchTags() {
    utils.fetchTags({ token: this.props.token })
      .then(tags => {
        this.setState({ tags })
      });
  }

  fetchFlashcards(tag) {
    utils.fetchFlashcards({ token: this.props.token, tag })
      .then(flashcards => {
        this.setState({ flashcards, selectedFlashcard: 0 })
      });
  }

  createFlashcard(flashcard) {
    utils.createFlashcard({ token: this.props.token, flashcard })
      .then(flashcard => {
        this.setState({ showDialog: false });
      });
  }
}

export default Main;
