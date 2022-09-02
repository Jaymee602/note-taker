const router = require('express').Router();
const fs = require('fs');
let notesArray = require('../db/db');

router.get('/notes', (req, res) => {
    res.json(notesArray);
});

router.post('/notes', (req, res) => {
    // set id
    req.body.id = notesArray.length + 1;
    // set text of new note = text on body of request
    let newNote = req.body;
    // add new note to the notes array
    notesArray.push(newNote);
    //update the database
    updateNotesArray();
    res.send(notesArray);
});

router.delete('/notes/:id', (req, res) => {
    // iterate through notes array until we find the id = to the req id
    let noteToDelete = req.params.id;
    for (let i = 0; i < notesArray.length; i++) {
        if (noteToDelete == notesArray[i].id) {
            notesArray.splice(i, 1);
            break;
        }
    }
    // update the database
    updateNotesArray();
    res.json(notesArray);
});

function updateNotesArray () {
    fs.writeFileSync(
        'db/db.json',
        JSON.stringify(notesArray)
    )
};

module.exports = router;