import React, { Component } from 'react';
import './LoginButton.css';

const authorizeUrl = 'https://github.com/login/oauth/authorize'
const clientId = '7f7d6103e2acb6a28cb7'
const scope = 'user'

class LoginButton extends Component {
  render() {
    return (
      <a className="LoginButton"
        href={`${authorizeUrl}?client_id=${clientId}&scope=${scope}`}
      >
        Log in with GitHub
      </a>
    );
  }
}

export default LoginButton;
