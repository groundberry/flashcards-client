import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import Header from './Header';
import Sidebar from './Sidebar';
import Flashcards from './Flashcards';
import FlashcardDialog from './FlashcardDialog';
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
          active={showDialog}
          onSave={this.handleSaveFlashcardDialog}
          onCancel={this.handleToggleFlashcardDialog}
        />
      </div>
    );
  }

  fetchTags() {
    const { token } = this.props;
    const url = `https://flashcards-server.herokuapp.com/tags?token=${token}`;

    fetch(url, {
      headers: {
        'Accept': 'application/json'
      },
    })
      .then(response => {
        return response.json();
      })
      .then(tags => {
        this.setState({ tags })
      })
      .catch(error => {
        console.error('Could not fetch tags', error);
      });
  }

  fetchFlashcards(currentTag) {
    const { token } = this.props;
    const url = `https://flashcards-server.herokuapp.com/tags/${currentTag}/flashcards?token=${token}`;

    fetch(url, {
      headers: {
        'Accept': 'application/json'
      },
    })
      .then(response => {
        return response.json();
      })
      .then(flashcards => {
        this.setState({ flashcards, selectedFlashcard: 0 })
      })
      .catch(error => {
        console.error('Could not fetch flashcards', error);
      });
  }

  createFlashcard(flashcard) {
    const { token } = this.props;
    const url = `https://flashcards-server.herokuapp.com/flashcards?token=${token}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ flashcard })
    })
      .then(response => {
        return response.json();
      })
      .then(flashcard => {
        this.setState({ showDialog: false });
      })
      .catch(error => {
        console.log('Could not create flashcard', error);
      });
  }
}

export default Main;
