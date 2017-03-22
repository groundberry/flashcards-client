import React, { Component } from 'react';
import { getQueryParams } from './utils';
import Login from './Login';
import Main from './Main';
import './App.css';

class App extends Component {
  constructor() {
    super();

    const params = getQueryParams();
    this.state = { token: params.token };
  }

  isLoggedIn() {
    return !!this.state.token;
  }

  render() {
    return (
      <div className='App'>
        {this.isLoggedIn()
          ? <Main token={this.state.token} />
          : <Login />
        }
      </div>
    );
  }
}

export default App;
