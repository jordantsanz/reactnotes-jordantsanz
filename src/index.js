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
    };
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateNoteZindex = this.updateNoteZindex.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
  deleteNote(id) {
    db.fbdeleteNote(id);
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
      <div>
        <NoteEntry createNote={this.createNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note id={id} note={note} key={id} deleteNote={this.deleteNote} updateNote={this.updateNote} updateNoteZindex={this.updateNoteZindex}> </Note>
          );
        })}
        <div>{this.state.test} </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
