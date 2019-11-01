const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let gameData = require('./data/gameData');

// Init middleware to process JSON body data sent to server
app.use(express.json({ extended: false }));

//Defining routes that are accessible within the server
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

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

// Forms the socket connection
io.on('connection', socket => {
  // Adds a player's ID to the players list
  gameData.onlineGames.playersConnected.push(socket.id);

  // Removes a player's ID from the players list
  socket.on('disconnect', () => {
    gameData.onlineGames.playersConnected = gameData.onlineGames.playersConnected.filter(
      id => id != socket.id
    );

    gameData.onlineGames.sessions.forEach(session => {
      if (session.players.includes(socket.id)) {
        session.players.forEach(player => {
          io.to(player).emit('playerDisconnected');
        });
      }
    });
  });

  // Handles creating a game session with data that is passed in
  socket.on('createSession', data => {
    let game = new gameData.GameSession(data.sessionID, data.gameData);
    game.players.push(data.playerID);
    game.status = 'preparing';
    gameData.onlineGames.sessions.push(game);
  });

  socket.on('playerJoin', data => {
    gameData.onlineGames.sessions.forEach(session => {
      if (
        session.id == data.gameID &&
        session.players.length != session.gameData.playerCount
      ) {
        session.players.push(data.playerID);
        socket.emit('joinResult', { result: true, gameData: session.gameData });
        if (session.players.length == session.gameData.playerCount) {
          session.gameData.gameStatus = 'ready';
          session.players.forEach(player => {
            io.to(player).emit('gameReady', { gameData: session.gameData });
          });
        }
      } else {
        socket.emit('joinResult', { result: false });
      }
    });
  });

  socket.on('checkPlayerCount', data => {
    gameData.onlineGames.sessions.forEach(session => {
      if (session.id == data.id) {
        socket.emit('returnPlayerCount', {
          playerCount: session.players.length
        });
      }
    });
  });

  socket.on('updateGame', data => {
    gameData.onlineGames.sessions.forEach(session => {
      if (session.id == data.gameID) {
        session.gameData = data.gameData;
        let currentPlayer = session.gameData.currentTurn;

        session.players.forEach(player => {
          io.to(player).emit('waitForTurn', { gameData: session.gameData });
        });

        io.to(session.players[currentPlayer]).emit('activePlayer', {
          gameData: session.gameData
        });
      }
    });
  });

  socket.on('murderAttempt', data => {
    gameData.onlineGames.sessions.forEach(session => {
      if (session.id == data.gameID) {
        session.gameData = data.gameData;
        let defenders = session.players.filter(
          session => session != data.player
        );

        defenders.forEach(defender => {
          io.to(defender).emit('attemptFailure', {
            gameData: session.gameData,
            player: session.players.indexOf(defender)
          });
        });
      }
    });
  });

  socket.on('contributeFailure', data => {
    gameData.onlineGames.sessions.forEach(session => {
      if (session.id == data.gameID) {
        session.gameData.MurderAttempt.failurePoints += data.failurePoints;
        session.gameData.MurderAttempt.defenders.pop();

        if (session.gameData.MurderAttempt.defenders.length == 0) {
          session.players.forEach(player => {
            io.to(player).emit('calculateMurder', {
              gameData: session.gameData
            });
          });
        }
      }
    });
  });

  socket.on('murderFailed', data => {
    gameData.onlineGames.sessions.forEach(session => {
      if (session.id == data.gameID) {
        session.gameData = data.gameData;
        if (
          session.players.indexOf(data.player) == session.gameData.currentTurn
        ) {
          io.to(data.player).emit('continueTurn', {
            gameData: session.gameData
          });
        }
      }
    });
  });
});
