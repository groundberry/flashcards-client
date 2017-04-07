import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import './FlashcardDialog.css'

class FlashcardDialog extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  handleChange(field, value) {
    this.props.onChange(field, value);
  }

  handleChangeTags(value) {
    this.props.onChange('tags', value.map(tag => ({ name: tag })));
  }

  handleClickSave() {
    this.props.onSave(this.props.flashcard);
  }

  handleClickCancel() {
    this.props.onCancel();
  }

  render() {
    if (this.props.flashcard == null) {
      return null;
    }

    const { flashcard, tags: suggestedTags } = this.props;
    const suggestedTagNames = (suggestedTags || []).map(tag => tag.name);
    const { question, answer, tags: existingTags } = flashcard;
    const existingTagNames = (existingTags || []).map(tag => tag.name);
    const sortedTagNames = existingTagNames.concat(suggestedTagNames).sort();

    return (
      <Dialog
        title='Edit flashcard'
        active={true}
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
          onChange={this.handleChange.bind(null, 'question')}
        />
        <Input
          type='text'
          label='Answer'
          name='answer'
          value={answer}
          required={true}
          multiline={true}
          onChange={this.handleChange.bind(null, 'answer')}
        />
        <Autocomplete
          direction='down'
          selectedPosition='above'
          label='Tags'
          name='tags'
          source={sortedTagNames}
          value={existingTagNames}
          allowCreate={true}
          required={true}
          multiple={true}
          onChange={this.handleChangeTags}
        />
      </Dialog>
    )
  }
}

export default FlashcardDialog;
