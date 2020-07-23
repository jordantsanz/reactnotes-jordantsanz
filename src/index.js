import React, { Component } from 'react';
import './style.scss';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import NoteEntry from './components/NoteEntry';
import Note from './components/Notes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateNoteZindex = this.updateNoteZindex.bind(this);
  }

  createNote(id, note) {
    this.setState((prevState) => ({
      notes: prevState.notes.set(id, note),
    }));
  }

  // deletes the note
  deleteNote(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.delete(id),
    }));
  }

  // updates text field on note
  updateNote(id, fields) {
    this.setState((prevState) => ({
      notes: prevState.notes.update(id, (n) => { return { ...n, ...fields }; }),
    }));
  }

  updateNoteZindex(idTarget) {
    this.state.notes.keySeq().forEach((id) => {
      // eslint-disable-next-line eqeqeq
      if (id == idTarget) {
        this.setState((prevState) => ({
          notes: prevState.notes.update(id, (n) => { return { ...n, zIndex: 100 }; }),
        }));
      } else if (this.state.notes.get(id).zIndex > 0) {
        this.setState((prevState) => ({
          notes: prevState.notes.update(id, (n) => { return { ...n, zIndex: prevState.notes.get(id).zIndex - 1 }; }),
        }));
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
