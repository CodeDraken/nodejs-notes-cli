const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesJSON = fs.readFileSync('notes-data.json');
    return JSON.parse(notesJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };

  const duplicateNotes = notes.filter( note => note.title === title );

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
  
};

const getAll = () => {
  return fetchNotes();
};

const getNote = (title) => {
  return fetchNotes().filter( note => note.title === title)[0];
};

const remove = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter( note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const logNote = (note) => {
  console.log('--');
  console.log(`Title:${note.title}`);
  console.log(`Body:${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  remove,
  logNote
};
