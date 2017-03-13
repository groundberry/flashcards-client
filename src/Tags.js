import React, { Component } from 'react';
import './Tags.css';
import './index.css';

class Tags extends Component {

renderTags() {
  if (this.props.tags == null) {
    return 'Loading...';
  }

  return (
    <ul className="Tags--list">
      {this.props.tags.map((tag, index) =>
        <li className="Tags--tag" key={index}>
          {tag.name}
        </li>
      )}
    </ul>
  );
}

  render() {
    return (
      <div className="Tags">
        {this.renderTags()}
      </div>
    );
  }
}

export default Tags;
