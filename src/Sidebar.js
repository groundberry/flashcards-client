import React, { Component } from 'react';
import Tags from './Tags'
import './Sidebar.css';
import './Tags.css';


class Sidebar extends Component {

  render() {
    return (
      <div className="Sidebar container">
        <div className="row">
          <h2 className="col-sm-8 col-sm-offset-2">
            My tags
          </h2>
          <div className="col-sm-8 col-xs-12 col-sm-offset-2">
            <Tags
              tags={this.props.tags}
              onClickTag={this.props.onClickTag}
              flashcards={this.props.flashcards}
            />
          </div>

          <button className="Sidebar-button btn btn-primary col-sm-8 col-sm-offset-2">
            Create new
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
