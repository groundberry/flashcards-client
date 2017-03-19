import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <AppBar title='Flashcards' leftIcon='menu'>
        <Navigation type='horizontal'>
          <Link
            href='#'
            active
            label='About'
            icon='favorite'
            className='Header-link'
          />
        </Navigation>
      </AppBar>
    );
  }
}

export default Header;
