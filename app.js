//console.log('Starting app...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions={
        describe: 'Title of note',
        demand: true,
        alias: 't'
};
const bodyOptions={
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs//set up input requirments for each command and help
    .command('add','Add a new note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('list','List all notes')
    .command('read', 'Read a note',{
        title: titleOptions
    })
    .command('remove', 'Remove a note',{
        title: titleOptions
    }
    )
    .help()
    .argv;
    
var command = argv._[0];//gets command line arguments
//console.log('Command: ',command);
//console.log('Yargs', argv);

if(command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    
    if(note === undefined){
        console.log('title already exists');
    }else{
        console.log('Note added:')
        notes.logNote(note);
    }
    
} else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes(s)`);
    allNotes.forEach((note)=> notes.logNote(note));

} else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed...' : 'Note not found...';
    console.log(message);
    //Same result as this
    // if(noteRemoved){console.log('Note removed...')}
    // else{console.log('Note not removed...')}

} else if(command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
    console.log('Note Read');
    notes.logNote(note);
    } else {console.log('Note not found...')}
    
} else {
    console.log('Command not recognized');
}