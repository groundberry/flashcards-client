import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Flashcards from './Flashcards';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: null,
      selectedTag: null,
      flashcards: null
    };

    this.handleClickTag = this.handleClickTag.bind(this);
  }

  handleClickTag(tag) {
    this.setState({ selectedTag: tag.id });
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

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.selectedTag);
    // TODO: make request for flashcards with selected tag
    const { token } = this.props;
    const { selectedTag } = this.state;
    const url = `https://flashcards-server.herokuapp.com/tags/${selectedTag}/flashcards?token=${token}`;

    if (this.state.selectedTag !== null) {
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(flashcards => {
          this.setState({ flashcards })
        });
    }
  }

  render() {
    const { tags } = this.state;

    return (
      <div className="Main">
        <Header />
        <main className="Main-content">
          <Sidebar
            tags={tags}
            onClickTag={this.handleClickTag}
          />
          <Flashcards />
        </main>
      </div>
    );
  }
}

export default Main;
