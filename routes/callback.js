const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  console.log(`callback called: ${req.url}`);
  res.send('Callback!');
});

module.exports = router;
