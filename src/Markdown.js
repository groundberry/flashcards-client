import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const renderers = Object.assign({}, ReactMarkdown.renderers, { CodeBlock });

class Markdown extends Component {
  render() {
    return (
      <ReactMarkdown
        source={this.props.source}
        renderers={renderers}
        skipHtml
      />
    );
  }
}

export default Markdown;
