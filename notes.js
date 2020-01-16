const fs = require('fs')
const chalk = require ('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()

    //Using array function "Find" will end process once match is found
    const duplicateNote = notes.find((note) => {return note.title === title})

    if (!duplicateNote){
        notes.push({
        title : title,
        body : body
    })
    saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
}
    else{
        console.log(chalk.red.inverse('Note title taken.'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => {return note.title !== title})
    saveNotes(notesToKeep)
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Delete Successful!'))
    } else {
        console.log(chalk.red.inverse('note not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNote = (title, body) => {
    const notes = loadNotes()
    const displayNote = notes.find((note) => {return note.title === title})

    if (displayNote){
            console.log(chalk.blue.inverse(title))
            console.log(displayNote.body)
            //saveNotes(notes)
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}