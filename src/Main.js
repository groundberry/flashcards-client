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
      selectedTagId: null,
      flashcards: null,
      selectedFlashcardIndex: null,
      showDialog: false
    };

    this.handleClickTag = this.handleClickTag.bind(this);
    this.handleClickPreviousFlashcard = this.handleClickPreviousFlashcard.bind(this);
    this.handleClickNextFlashcard = this.handleClickNextFlashcard.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleSaveFlashcardDialog = this.handleSaveFlashcardDialog.bind(this);
    this.handleToggleFlashcardDialog = this.handleToggleFlashcardDialog.bind(this);
  }

  handleClickTag(tag) {
    this.setState({ selectedTagId: tag.id });
  }

  handleClickPreviousFlashcard() {
    this.setState(prevState => {
      return {
        selectedFlashcardIndex: Math.max(0, prevState.selectedFlashcardIndex - 1)
      };
    });
  }

  handleClickNextFlashcard() {
    this.setState(prevState => {
      return {
        selectedFlashcardIndex: Math.min(prevState.selectedFlashcardIndex + 1, prevState.flashcards.length - 1)
      };
    });
  }

  handleClickDelete(flashcard) {
    this.deleteFlashcard(flashcard);
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
    const currentTagId = this.state.selectedTagId;
    const prevTagId = prevState.selectedTagId;

    if (currentTagId === prevTagId || currentTagId == null) {
      return;
    }

    this.fetchFlashcards(currentTagId);
  }

  render() {
    const {
      info,
      tags,
      selectedTagId,
      flashcards,
      selectedFlashcardIndex,
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
            tagId={selectedTagId}
            flashcards={flashcards}
            selectedFlashcardIndex={selectedFlashcardIndex}
            onClickPreviousFlashcard={this.handleClickPreviousFlashcard}
            onClickNextFlashcard={this.handleClickNextFlashcard}
            onClickDelete={this.handleClickDelete}
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
        this.setState({ flashcards, selectedFlashcardIndex: 0 })
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
            utils.contains(flashcard.tags, {id: prevState.selectedTagId}, idComparator)
              ? flashcard
              : []
          );
          const newIndex = prevState.selectedFlashcardIndex || 0;

          return {
            showDialog: false,
            tags: newTags,
            flashcards: newFlashcards,
            selectedFlashcardIndex: newIndex
          };
        });
      });
  }

  deleteFlashcard(flashcard) {
    utils.deleteFlashcard({ token: this.props.token, flashcard })
      .then(() => {
        this.setState(prevState => {
          const newFlashcards = prevState.flashcards.filter((f) => {
            return f.id !== flashcard.id;
          });
          const newIndex = prevState.flashcards.length - 1 > 0
            ? Math.max(0, prevState.selectedFlashcardIndex - 1)
            : null;

          return {
            flashcards: newFlashcards,
            selectedFlashcardIndex: newIndex
          }
        });
      });
  }
}

export default Main;
