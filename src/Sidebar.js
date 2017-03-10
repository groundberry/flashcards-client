import React, { Component } from 'react';
import Tags from './Tags'
import './Sidebar.css';
import './Tags.css';


class Sidebar extends Component {

  constructor(props) {
   super(props);
   this.state = {isToggleOn: true};

   // This binding is necessary to make `this` work in the callback
   this.handleClick = this.handleClick.bind(this);
 }

 handleClick() {
   this.setState(prevState => ({
     isToggleOn: !prevState.isToggleOn
   }));
 }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="Sidebar col-xs-4">

            <button className="select btn btn-primary col-sm-8 col-xs-12 col-sm-offset-2" onClick={this.handleClick}>My tags
            </button>
            <div className=" col-sm-8 col-xs-12 col-sm-offset-2">
              {this.state.isToggleOn ? '' : <Tags />}
            </div>

            <button className="select btn btn-primary col-sm-8 col-xs-12 col-sm-offset-2">Create new</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
