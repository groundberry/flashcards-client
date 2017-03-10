import React, { Component } from 'react';
import './Tags.css';
import './index.css';

class Tags extends Component {

  render() {
    return (
      <div className="Tags">
        <ul className="Tags-list col-xs-12">
          <li><a className="Tags-link">Tag 1</a></li>
          <li><a className="Tags-link">Tag 2</a></li>
          <li><a className="Tags-link">Tag 3</a></li>
        </ul>
      </div>
    );
  }
}

export default Tags;
