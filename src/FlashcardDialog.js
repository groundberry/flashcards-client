import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import './FlashcardDialog.css'

class FlashcardDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: '',
      tags: []
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
    this.setState({ [field]: value });
  }

  render() {
    const { question, answer, tags } = this.state;
    const { active, tags: suggestedTags } = this.props;
    const suggestedTagNames = (suggestedTags || []).map((tag) => tag.name);
    const sortedTagNames = tags.concat(suggestedTagNames).sort();

    return (
      <Dialog
        title='Create new flashcard'
        active={active}
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
          value={question}
          required={true}
          multiline={true}
          onChange={this.handleChange.bind(this, 'question')}
        />
        <Input
          type='text'
          label='Answer'
          name='answer'
          value={answer}
          required={true}
          multiline={true}
          onChange={this.handleChange.bind(this, 'answer')}
        />
        <Autocomplete
          direction='down'
          selectedPosition='above'
          label='Tags'
          name='tags'
          source={sortedTagNames}
          value={tags}
          allowCreate={true}
          required={true}
          multiple={true}
          onChange={this.handleChange.bind(this, 'tags')}
        />
      </Dialog>
    )
  }
}

export default FlashcardDialog;
