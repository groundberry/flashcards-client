import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Flashcards from './Flashcards';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Header />
        <main className="Main-content">
          <Sidebar />
          <Flashcards />
        </main>
      </div>
    );
  }
}

export default Main;
