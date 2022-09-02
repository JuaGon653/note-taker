const express = require('express');
const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const uuid = require('./public/helpers/uuid');

const PORT = process.env.PORT || 3001;

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
    let updateNotes;
    fs.readFile('./db/db.json', (err, data) => {
        updateNotes = JSON.parse(data);
        res.json(updateNotes);
    })
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    const { title, text } = req.body;

    if(title && text) {

        const newNote = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile('./db/db.json', (err, data) => {
            let notesArr = JSON.parse(data);
            notesArr.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(notesArr, null, 4), () => {});
        });

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.status(500).json('Error in posting new note');
    }
})

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    fs.readFile('./db/db.json', (err, data) => {
        let notesArr = JSON.parse(data);
        for(let i = 0; i < notesArr.length; i++) {
            if(notesArr[i].id == req.params.id) {
                notesArr.splice(i, 1);
            }
        }
        fs.writeFile('./db/db.json', JSON.stringify(notesArr, null, 4), () => {});
    });

    res.json('Item Deleted');
})


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);