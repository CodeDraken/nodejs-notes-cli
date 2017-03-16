const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./notes');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'list all notes')
  .command('read', 'read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
const command = argv._[0];


switch (command) {
case 'add':
  var noteAdded = notes.addNote(argv.title, argv.body);
  noteAdded ? notes.logNote(noteAdded) : console.log('Failed to add note');
  break;
case 'list':
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} notes(s)`);
  allNotes.forEach( note => notes.logNote(note) );
  break;
case 'read':
  var note = notes.getNote(argv.title);
  note ? notes.logNote(note) : console.log('Note not found');
  break;
case 'remove':
  var noteRemoved = notes.remove(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note failed to be removed';
  console.log(message);
  
  break;
default:
  console.log('command not recognized');
  break;
}
