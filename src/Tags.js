import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import './Tags.css';

class Tags extends Component {
  handleClickTag(tag) {
    this.props.onClickTag(tag);
  }

  renderTags() {
    const { tags } = this.props;

    if (tags == null) {
      return (
        <div className='Tags-loading'>
          Loading...
        </div>
      );
    }

    return (
      <List selectable ripple>
        <ListSubHeader caption='Tags' />
        {tags.map((tag, index) =>
          <ListItem
            key={index}
            caption={tag.name}
            onClick={this.handleClickTag.bind(this, tag)}
          />
        )}
      </List>
    );
  }

  render() {
    return (
      <div className='Tags'>
        {this.renderTags()}
      </div>
    );
  }
}

export default Tags;
