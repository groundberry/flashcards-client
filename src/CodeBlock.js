import React, { Component } from 'react';
import hljs from 'highlightjs';
import './CodeBlock.css'

class CodeBlock extends Component {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.code);
  }

  render() {
    const { language, literal } = this.props;

    return (
      <pre className="CodeBlock">
        <code className={language}
          ref={(code) => { this.code = code; }}
        >
          {literal}
        </code>
      </pre>
    );
  }
}

export default CodeBlock;
