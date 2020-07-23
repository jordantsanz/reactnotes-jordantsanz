/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faArrowsAlt, faCheck, faStar,
} from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prefer-stateless-function
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      isUpdatingTitle: false,
    };
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.finishedUpdating = this.finishedUpdating.bind(this);
    this.rotateAnimation = this.rotateAnimation.bind(this);
    this.finishedAnimation = this.finishedAnimation.bind(this);
  }

  onInputChange(event) {
    const field = {
      text: event.target.value,
    };

    this.props.updateNote(this.props.id, field);
  }

  onInputChangeTitle = (event) => {
    const field = {
      title: event.target.value,
    };

    this.props.updateNote(this.props.id, field);
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

  updateNote() {
    this.setState({
      isUpdating: true,
      isUpdatingTitle: true,
    });
  }

  deleteNote() {
    this.props.deleteNote(this.props.id, this.props.note);
  }

  rotateAnimation() {
    const field = {
      color: 'note-fun',
    };
    this.props.updateNote(this.props.id, field);
  }

  finishedAnimation() {
    const field = {
      color: this.props.note.oldField,
    };
    this.props.updateNote(this.props.id, field);
  }

  finishedUpdating() {
    const field = {
      title: this.props.note.title,
      text: this.props.note.text,
    };

    this.props.updateNote(this.props.id, field);
    this.setState({
      isUpdating: false,
      isUpdatingTitle: false,
    });
  }

  renderUpdate() {
    if (this.state.isUpdating) {
      return (
        <div className="bottom-note">
          <TextareaAutosize minRows={3} maxRows={6} className="inputTextbox" value={this.props.note.text} onChange={this.onInputChange} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    }
  }

  // eslint-disable-next-line consistent-return
  renderCheckbox() {
    if (this.state.isUpdating) {
      return (
        <FontAwesomeIcon icon={faCheck} className="icon" id="check" onClick={this.finishedUpdating} />
      );
    }
  }

  renderUpdateTitle() {
    if (this.state.isUpdatingTitle) {
      return (
        <div>
          <TextareaAutosize minRows={2} className="inputTextbox" id="title" value={this.props.note.title} onChange={this.onInputChangeTitle} />
        </div>
      );
    } else {
      return (
        <h1 className="noteTitle"> {this.props.note.title} </h1>
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
        <div onAnimationEnd={this.finishedAnimation} className={this.props.note.color} id={this.props.id} style={{ zIndex: this.props.note.zIndex }}>
          <div className="note-top-row">
            <FontAwesomeIcon icon={faStar} className="icon" id="star" onClick={this.rotateAnimation} />
            <FontAwesomeIcon icon={faTrash} className="icon" id="trash" onClick={this.deleteNote} />
            <FontAwesomeIcon icon={faArrowsAlt} className="arrowsIcon" id="arrows" />
            <div className="textbox" id="title-textbox" onClick={this.updateNote}>{this.renderUpdateTitle()}</div>
          </div>
          <div className="textbox" id="main-text" onClick={this.updateNote}>{this.renderUpdate()}</div>
          {this.renderCheckbox()}
        </div>
      </Draggable>

    );
  }
}

export default Note;
