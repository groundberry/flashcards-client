import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Flashcards from './Flashcards';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null
    };
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

  render() {
    const { tags } = this.state;

    return (
      <div className="Main">
        <Header />
        <main className="Main-content">
          <Sidebar tags={tags} />
          <Flashcards />
        </main>
      </div>
    );
  }
}

export default Main;
