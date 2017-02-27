import React, { Component } from 'react';
import { getQueryParams } from './utils';
import Login from './Login';
import Main from './Main';
import './App.css';

class App extends Component {
  isLoggedIn() {
    const params = getQueryParams();
    return !!params.token;
  }

  render() {
    return (
      <div className="App">
        {this.isLoggedIn()
          ? <Main />
          : <Login />
        }
      </div>
    );
  }
}

export default App;
