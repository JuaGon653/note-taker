# note-taker

## Description

For my module 11 challenge in the coding bootcamp, I was required to work on the back-end of an application and connect it to the front-end. The purpose of this app is to be able to add and delete notes at the user's will. When you add a new note, that note title is displayed to the left with a list of other note titles that can be clicked, to display the note's title and text. After submitting a note, it can not be editted. There was a little problem in the front end where clicking the padding of a note's title in the list would cause it to not link with the right element; so in order to avoid that problem, to display a note, click directly onto the note's title text. The saved notes are stored in a json file that is manipulated through a POST request to add notes and a DELETE request to delete a note. To view/get all the saved notes, I use a GET request that sends the data stored in the json file.  

## Link to Deployed Application

Hosted on Heroku<br>
https://protected-brushlands-97923.herokuapp.com/

## Photos

### Start Up Page/Empty Note
![empty-note](https://user-images.githubusercontent.com/106782112/188950077-89c164e1-932b-4e12-84fb-038008607c5d.png)

### Viewing Note
![viewing-note](https://user-images.githubusercontent.com/106782112/188950104-3859fcb3-5aea-4764-9d62-18d4a5d269eb.png)

### New Note
![new-note](https://user-images.githubusercontent.com/106782112/188950147-2738668c-fa9c-4a9f-b085-0176534866fc.png)
