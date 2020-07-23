/* eslint-disable quotes */
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDyR-rzP-GO0Pg4V-V-OzpbV9XARH_st48',
  authDomain: 'notes-react-6b837.firebaseapp.com',
  databaseURL: 'https://notes-react-6b837.firebaseio.com',
  projectId: 'notes-react-6b837',
  storageBucket: 'notes-react-6b837.appspot.com',
  messagingSenderId: '536359619385',
  appId: '1:536359619385:web:3ba0a5968d041c71db76e8',
  measurementId: 'G-DT9K4D0Q1P',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const database = firebase.database();

export function fbfetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    // do something with new note state
    callback(newNoteState);
  });
}

export function fbupdateNotes(id, updates) {
  firebase.database().ref('notes').child(id).update(updates);
}

export function fbcreateNote(newNote) {
  firebase.database().ref('notes').push(newNote);
}

export function fbdeleteNote(id) {
  firebase.database().ref('notes').child(id).remove();
}
