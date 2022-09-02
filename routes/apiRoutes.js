const router = require('express').Router();
const { json } = require('express/lib/response');
const fs = require('fs');
const notesArray = require('../db/db');

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

function updateNotesArray () {
    fs.writeFileSync(
        'db/db.json',
        JSON.stringify(notesArray)
    )
}
module.exports = router;