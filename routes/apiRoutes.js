const router = require('express').Router();
const { del } = require('express/lib/application');
const { json } = require('express/lib/response');
const fs = require('fs');
let notesArray = require('../db/db');

router.get('/notes', (req, res) => {
    res.json(notesArray);
});

router.post('/notes', (req, res) => {
    // set id
    req.body.id = notesArray.length + 1;
    let newNote = req.body;
    notesArray.push(newNote);
    updateNotesArray();
    res.send(notesArray);
});

router.delete('/notes/:id', (req, res) => {
    let noteToDelete = req.params.id;
    for (let i = 0; i < notesArray.length; i++) {
        if (noteToDelete == notesArray[i].id) {
            notesArray.splice(i, 1);
            break;
        }
    }
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