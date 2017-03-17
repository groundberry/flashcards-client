import React, { Component } from 'react';
import './Tags.css';

class Tags extends Component {
  handleClickTag(tag, evt) {
    evt.preventDefault();
    this.props.onClickTag(tag);
  }

  renderTags() {
    if (this.props.tags == null) {
      return 'Loading...';
    }

    return (
      <ul className="Tags--list">
        {this.props.tags.map((tag, index) =>
          <a className="Tags--tag"
            href="#"
            key={index}
            onClick={this.handleClickTag.bind(this, tag)}
          >
            {tag.name}
          </a>
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
