const express = require('express');
const router = express.Router();
let gameData = require('../../data/gameData');

// Route to return the game data by itself to allow public access
router.get('/', (req, res) => {
  res.send(gameData);
});

// Defines a post route that receives a request body containg game data
// Returns JSON with the game object for reference and either success/failure msg
router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body) {
    gameData = req.body;
    return res.json({
      msg: 'Server received updated gameData.',
      currentData: gameData
    });
  } else {
    return res.status(500).json({ msg: 'Error sending gameData.' });
  }
});

// Exporting the routes defined above
module.exports = router;
