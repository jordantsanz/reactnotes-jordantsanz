/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowsAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prefer-stateless-function
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '(click here to type)',
      // eslint-disable-next-line react/no-unused-state
      title: this.props.note.title,
      id: this.props.id,
      isUpdating: false,
      isUpdatingTitle: false,
    };
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.finishedUpdating = this.finishedUpdating.bind(this);
  }

  onInputChange(event) {
    this.setState({ text: event.target.value });
  }

  onInputChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  onStart = (event, data) => {
    this.props.updateNoteZindex(this.props.id);
  }

  onDrag = (event, data) => {
    const fields = {
      x: data.x,
      y: data.y,
    };

    this.props.updateNote(this.props.id, fields);
  }

  deleteNote() {
    this.props.deleteNote(this.state.id);
  }

  updateNote() {
    this.state.isUpdating = true;
    this.state.isUpdatingTitle = true;
    this.props.updateNote(this.state.id, this.state.text);
  }

  finishedUpdating() {
    this.setState({
      isUpdating: false,
      isUpdatingTitle: false,
    });
  }

  renderUpdate() {
    if (this.state.isUpdating) {
      return (
        <div className="bottom-note">
          <TextareaAutosize minRows={3} maxRows={6} className="inputTextbox" value={this.state.text} onChange={this.onInputChange} />
          <FontAwesomeIcon icon={faCheck} className="icon" id="check" onClick={this.finishedUpdating} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.state.text || '') }} />
        </div>
      );
    }
  }

  renderUpdateTitle() {
    if (this.state.isUpdatingTitle) {
      return (
        <div>
          <TextareaAutosize minRows={2} className="inputTextbox" id="title" value={this.state.title} onChange={this.onInputChangeTitle} />
        </div>
      );
    } else {
      return (
        <h1 className="noteTitle"> {this.state.title} </h1>
      );
    }
  }

  render() {
    return (
      <Draggable
        onStart={this.onStart}
        onDrag={this.onDrag}
        onStop={this.onDrag}
        handle=".arrowsIcon"
        grid={[25, 25]}
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={{
          x: this.props.note.x, y: this.props.note.y,
        }}

      >
        <div className={this.props.note.color} id={this.props.note.id} style={{ zIndex: this.props.note.zIndex }}>
          <div className="note-top-row">
            <FontAwesomeIcon icon={faTrash} className="icon" id="trash" onClick={this.deleteNote} />
            <FontAwesomeIcon icon={faArrowsAlt} className="arrowsIcon" id="arrows" />
            <div className="textbox" id="title-textbox" onClick={this.updateNote}>{this.renderUpdateTitle()}</div>
          </div>
          <div className="textbox" id="main-text" onClick={this.updateNote}>{this.renderUpdate()}</div>
        </div>
      </Draggable>

    );
  }
}

export default Note;
