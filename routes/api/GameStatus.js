const express = require('express');
const router = express.Router();

let gameData;

router.get('/', (req, res) => {
  res.send(gameData);
});

router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body) {
    gameData = req.body;
    return res.json({ msg: 'Server received updated gameData.' });
  } else {
    return res.status(500).json({ msg: 'Error sending gameData.' });
  }
});

module.exports = router;
