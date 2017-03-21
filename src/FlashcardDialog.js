import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import './FlashcardDialog.css'

class FlashcardDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: '',
      tags: []
    };
  }

  handleChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };

  render() {
    return (
      <Dialog
        title='Create new flashcard'
        active={this.props.active}
        actions={[
          { label: "Cancel", onClick: this.props.onCancel },
          { label: "Save", onClick: this.props.onSave }
        ]}
        onOverlayClick={this.props.onCancel}
        onEscKeyDown={this.props.onCancel}
      >
      <Input
        type='text'
        name='question'
        label='Question'
        value={this.state.question}
        required={true}
        multiline={true}
        onChange={this.handleChange.bind(this, 'question')}
      />
      <Input
        type='text'
        label='Answer'
        name='answer'
        value={this.state.answer}
        required={true}
        multiline={true}
        onChange={this.handleChange.bind(this, 'answer')}
      />
      <Input
        type='text'
        label='Tags'
        name='tags'
        value={this.state.tags}
        required={true}
        multiline={true}
        onChange={this.handleChange.bind(this, 'tags')}
      />
      </Dialog>
    )
  }
}

export default FlashcardDialog;
