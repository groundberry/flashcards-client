import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Flashcards from './Flashcards';
import CreateNew from './CreateNew';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: null,
      selectedTag: null,
      flashcards: null,
      selectedFlashcard: null
    };

    this.handleClickTag = this.handleClickTag.bind(this);
    this.handleClickPreviousFlashcard = this.handleClickPreviousFlashcard.bind(this);
    this.handleClickNextFlashcard = this.handleClickNextFlashcard.bind(this);
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

  componentDidMount() {
    const { token } = this.props;
    const url = `https://flashcards-server.herokuapp.com/tags?token=${token}`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(tags => {
        this.setState({ tags })
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { token } = this.props;
    const currentTag = this.state.selectedTag;
    const prevTag = prevState.selectedTag;

    if (currentTag === prevTag || currentTag == null) {
      return;
    }

    const url = `https://flashcards-server.herokuapp.com/tags/${currentTag}/flashcards?token=${token}`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(flashcards => {
        this.setState({ flashcards, selectedFlashcard: 0 })
      });
  }

  render() {
    const {
      tags,
      selectedTag,
      flashcards,
      selectedFlashcard
    } = this.state;

    return (
      <div className="Main">
        <Header />
        <main className="Main-content">
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
          <CreateNew />
        </main>
      </div>
    );
  }
}

export default Main;
