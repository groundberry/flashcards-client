import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <nav className="Header navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              Flashcards
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#">
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
