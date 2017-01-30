import React, { Component } from 'react';
import './App.css';

class Tags extends Component {
  render() {
    return (
      <div className="tags-panel">
        <h2 className="tags-header">Your tags</h2>
        <a className="tag-name" href="https://www.javascript.com/">JavaScript</a>
        <a className="tag-name" href="https://www.ruby-lang.org/">Ruby</a>
        <a className="tag-name" href="http://rubyonrails.org/">Ruby on Rails</a>
      </div>
    );
  }
}

export default Tags;
