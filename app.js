const chalk = require ('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//customise yargs version
yargs.version('1.1.0')

//Create add remove read list commands

//add command
yargs.command({
    command: 'add',
    describe:'Adding note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe:'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('Title: ' + argv.title)
        // console.log('Body: ' + argv.body)
        notes.addNote(argv.title, argv.body)
    }
})
//remove command
yargs.command({
    command: 'remove',
    describe:'Remove a note',
    builder: {
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        console.log('Removing a note...')
        notes.removeNote(argv.title)
    }
})
//list command
yargs.command({
    command: 'list',
    describe: 'List of notes',
    handler(argv){
        console.log(chalk.blue.inverse('Your Notes'))
        notes.listNotes(argv.title)
    }
})
//read command
yargs.command({
    command: 'read',
    describe: 'Reading note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title, argv.body)
    }
})

yargs.parse()