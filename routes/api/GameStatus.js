const express = require('express');
const router = express.Router();

let gameData;

router.get('/', (req, res) => {
  res.send('Test');
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('received');
});

module.exports = router;
