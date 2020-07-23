/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import './style.scss';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import * as db from './services/datastore';
import NoteEntry from './components/NoteEntry';
import Note from './components/Notes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Map(),
      deletedNote: null,
      deletedId: null,
    };
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateNoteZindex = this.updateNoteZindex.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.undoNote = this.undoNote.bind(this);
  }

  componentDidMount() {
    db.fbfetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  createNote(newNote) {
    db.fbcreateNote(newNote);
  }

  // deletes the note
  deleteNote(id, incomingNote) {
    this.setState({
      deletedNote: incomingNote,
      deletedId: id,
    });
    db.fbdeleteNote(id);
  }

  undoNote() {
    if (this.state.deletedNote != null && this.state.deletedNote !== '') {
      db.fbupdateNotes(this.state.deletedId, this.state.deletedNote);
      this.setState({
        deletedNote: '',
      });
    }
  }

  // updates text field on note
  updateNote(id, fields) {
    db.fbupdateNotes(id, fields);
  }

  updateNoteZindex(idTarget) {
    this.state.notes.keySeq().forEach((id) => {
      // eslint-disable-next-line eqeqeq
      if (id == idTarget) {
        const field = { zIndex: 100 };
        db.fbupdateNotes(id, field);
      } else if (this.state.notes.get(id).zIndex > 0) {
        const field = { zIndex: this.state.notes.get(id).zIndex - 1 };
        db.fbupdateNotes(id, field);
      }
    });
  }

  render() {
    return (
      <div className="main-flexbox">
        <NoteEntry createNote={this.createNote} undoNote={this.undoNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note id={id} note={note} key={id} deleteNote={this.deleteNote} updateNote={this.updateNote} updateNoteZindex={this.updateNoteZindex}> </Note>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
