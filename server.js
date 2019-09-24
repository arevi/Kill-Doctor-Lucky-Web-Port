const express = require('express');
const app = express();
const path = require('path');

// Init middleware to process JSON body data sent to server
app.use(express.json({ extended: false }));

//Defining routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use(express.static(__dirname + '/client'));

app.use('/api/gamedata', require('./routes/api/GameStatus'));

// Defines a PORT for our server to listen on
// If an environmental variable is setup in the server container, it will use it
// Otherwise we will default to PORT 3000 (Most likely development)
const PORT = process.env.PORT || 3000;

// Initiates our server to listen on the PORT variable
app.listen(PORT);
