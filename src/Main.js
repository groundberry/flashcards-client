import React, { Component } from 'react';
import Sidebar from './Sidebar';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Sidebar />
      </div>
    );
  }
}

export default Main;
