const express = require('express');
// decided not to use below variable because it wouldn't show recently saved notes
// const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const uuid = require('./public/helpers/uuid');

// port that heroku or your local system can use
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// displays index.html on base url
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.use(express.static('public'))

// displays notes.html on '/notes' path
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// sends the saved notes 
app.get('/api/notes', (req, res) => {
    // using 'res.json(notes)' would result in returning notes that were in the json file at the start of the start up of the page
    let updateNotes;
    fs.readFile('./db/db.json', (err, data) => {
        updateNotes = JSON.parse(data);
        res.json(updateNotes);
    })
})

// adds new saved note to json file
app.post('/api/notes', (req, res) => {
    // console.info(`${req.method} request received to add a review`);
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

// deletes note out of json file based off of the id
app.delete('/api/notes/:id', (req, res) => {
    if(req.params.id){
        // console.info(`${req.method} request received to add a review`);
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
    } else {
        res.json('')
    }

    
})


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);