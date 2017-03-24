import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import './FlashcardDialog.css'

class FlashcardDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: ''
    };

    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  handleClickCancel() {
    this.props.onCancel();
  }

  handleClickSave() {
    this.props.onSave(this.state);
  }

  handleChange(field, value) {
    this.setState({...this.state, [field]: value});
  }

  render() {
    return (
      <Dialog
        title='Create new flashcard'
        active={this.props.active}
        actions={[
          { label: 'Cancel', onClick: this.handleClickCancel },
          { label: 'Save', onClick: this.handleClickSave }
        ]}
        onOverlayClick={this.handleClickCancel}
        onEscKeyDown={this.handleClickCancel}
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
      </Dialog>
    )
  }
}

export default FlashcardDialog;
