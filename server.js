const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Init middleware to process JSON body data sent to server
app.use(express.json({ extended: false }));

//Defining routes that are accessible within the server
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use('/api/gamedata', require('./routes/api/GameStatus'));

//Defining routes to access static objects, all of which are stored in /client
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/audio'));

// Defines a PORT for our server to listen on
// If an environmental variable is setup in the server container, it will use it
// Otherwise we will default to PORT 3000 (Most likely development)
const PORT = process.env.PORT || 3000;

// Initiates our server to listen on the PORT variable with Socket.IO
http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// Console logs a user's ID when they connect
io.on('connection', function(socket) {
  console.log(`a user connected ID: ${socket.id}`);
});
