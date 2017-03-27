import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import './Header.css';

class Header extends Component {
  render() {
    const { info } = this.props;

    return (
      <AppBar title='Flashcards' leftIcon='menu'>
        <Navigation type='horizontal'>
          {info != null && (
            <span>
              <Avatar className='Header-userAvatar'
                image={info.avatar_url}
              />
              <span className='Header-userName'>
                {info.name}
              </span>
            </span>
          )}
          <Link
            href='#'
            active
            label='Log out'
            icon='exit_to_app'
            className='Header-link'
          />
        </Navigation>
      </AppBar>
    );
  }
}

export default Header;
