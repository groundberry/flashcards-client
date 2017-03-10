import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="Sidebar col-sm-4 col-xs-3">
            <button>Tags</button>
            <button>Flashcards</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
