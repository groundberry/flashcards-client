import React, { Component } from 'react';
import LoginButton from './LoginButton';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Flashcards</h2>
          <p className="App-intro">An app to learn any subject </p>
          <p className="App-intro">through spaced repetition.</p>
        </div>
        <div className="App-buttons">
          <LoginButton />
        </div>
      </div>
    );
  }
}

export default App;
