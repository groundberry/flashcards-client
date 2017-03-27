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
      info: null,
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
    this.fetchUserDetails();
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
      info,
      tags,
      selectedTag,
      flashcards,
      selectedFlashcard,
      showDialog
    } = this.state;

    return (
      <div className='Main'>
        <Header
          info={info}
        />
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

  fetchUserDetails() {
    utils.fetchUserDetails({ token: this.props.token })
      .then(info => {
        this.setState({ info })
      });
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
        this.setState(prevState => {
          const idComparator = (a, b) => (a.id === b.id);
          // Add new tags to the current list of tags removing duplicates.
          const newTags = utils.union(prevState.tags, flashcard.tags, idComparator);
          // Add new flashcard to the current list of flashcards if it contains
          // the current tag.
          const newFlashcards = prevState.flashcards.concat(
            utils.contains(flashcard.tags, {id: prevState.selectedTag}, idComparator)
              ? flashcard
              : []
          );

          return {
            showDialog: false,
            tags: newTags,
            flashcards: newFlashcards,
          };
        });
      });
  }
}

export default Main;
