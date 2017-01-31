import React, { Component } from 'react';
import LoginButton from './LoginButton';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="App-title">
            Flashcards
          </h2>
          <p className="App-intro">
            An app to learn any subject through spaced repetition.
          </p>
        </div>
        <div className="App-buttons">
          <LoginButton />
        </div>
      </div>
    );
  }
}

export default App;
