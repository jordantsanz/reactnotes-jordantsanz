/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';

class NoteEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {
        title: '',
        text: '(click here to type)',
        x: 0,
        y: 0,
        zIndex: 1,
        color: 'note-pink',
      },
      colorBox: {
        red: 'color-box',
        orange: 'color-box',
        green: 'color-box',
        purple: 'color-box',
        pink: 'color-box',
      },
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.createNote = this.createNote.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  // on change of input in searchbar note entry component
  onInputChange(event) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const note = { ...this.state.note };
    note.title = event.target.value;
    this.setState({ note });
  }

  // creates the note
  createNote() {
    const note = { ...this.state.note };
    const zIndexCounter = note.zIndex + 1;
    note.zIndex = zIndexCounter;
    this.setState((prevState) => ({
      note,
    }));
    this.props.createNote(this.state.note);

    note.title = '';
    this.setState((prevState) => ({
      note,
    }));
  }

  changeColor(color) {
    let newColor = '';
    const colorBox = { ...this.state.colorBox };
    switch (color) {
      case 'red':
        newColor = 'note-red';
        // eslint-disable-next-line react/no-access-state-in-setstate
        colorBox.red = 'color-box-clicked';
        colorBox.orange = 'color-box';
        colorBox.green = 'color-box';
        colorBox.purple = 'color-box';
        colorBox.pink = 'color-box';
        this.setState({
          colorBox,
        });
        break;
      case 'green':
        newColor = 'note-green';
        // eslint-disable-next-line react/no-access-state-in-setstate
        colorBox.red = 'color-box';
        colorBox.orange = 'color-box';
        colorBox.green = 'color-box-clicked';
        colorBox.purple = 'color-box';
        colorBox.pink = 'color-box';
        this.setState({
          colorBox,

        });
        break;
      case 'pink':
        newColor = 'note-pink';
        // eslint-disable-next-line react/no-access-state-in-setstate
        colorBox.red = 'color-box';
        colorBox.orange = 'color-box';
        colorBox.green = 'color-box';
        colorBox.purple = 'color-box';
        colorBox.pink = 'color-box-clicked';
        this.setState({
          colorBox,

        });
        break;
      case 'orange':
        newColor = 'note-orange';
        // eslint-disable-next-line react/no-access-state-in-setstate
        colorBox.red = 'color-box';
        colorBox.orange = 'color-box-clicked';
        colorBox.green = 'color-box';
        colorBox.purple = 'color-box';
        colorBox.pink = 'color-box';
        this.setState({
          colorBox,

        });
        break;
      case 'purple':
        newColor = 'note-purple';
        // eslint-disable-next-line react/no-access-state-in-setstate
        colorBox.red = 'color-box';
        colorBox.orange = 'color-box';
        colorBox.green = 'color-box';
        colorBox.purple = 'color-box-clicked';
        colorBox.pink = 'color-box';
        this.setState({
          colorBox,

        });
        break;
      default:
        newColor = 'note-pink';
    }
    const note = { ...this.state.note };
    note.color = newColor;
    this.setState((prevState) => ({
      // eslint-disable-next-line react/no-unused-state
      note,
    }));
  }

  render() {
    return (
      <div className="NoteEntryFlexbox">
        <input className="entryinput" onChange={this.onInputChange} value={this.state.note.title} placeholder="Type title here..." />
        <div className="creating-things">
          <button className="button" type="button" onClick={this.createNote}>Create a Note</button>
          <div className="color-selection">
            <div className={this.state.colorBox.red} id="red" onClick={() => this.changeColor('red')} />
            <div className={this.state.colorBox.orange} id="orange" onClick={() => this.changeColor('orange')} />
            <div className={this.state.colorBox.green} id="green" onClick={() => this.changeColor('green')} />
            <div className={this.state.colorBox.purple} id="purple" onClick={() => this.changeColor('purple')} />
            <div className={this.state.colorBox.pink} id="pink" onClick={() => this.changeColor('pink')} />
          </div>
        </div>
      </div>
    );
  }
}

export default NoteEntry;
