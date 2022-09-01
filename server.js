const express = require('express');
const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const { notStrictEqual } = require('assert');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.use(express.static('public'))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    const { title, text } = req.body;

    if(title && text) {

        const newNote = {
            title,
            text
        };

        fs.readFile('./db/db.json', (err, data) => {
            let notesArr = JSON.parse(data);
            notesArr.push(newNote);
            fs.writeFileSync('./db/db.json', JSON.stringify(notesArr), () => {});
            res.json(notesArr)
        });

        

        const response = {
            status: 'success', 
            body: newNote
        }

        
    } else {
        res.status(500).json('Error in posting new note');
    }
})


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);