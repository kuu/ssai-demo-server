const express = require('express');
const config = require('config');
const OoyalaApi = require('ooyala-api').default;
const values = require('../const');

const router = express.Router();
const api = new OoyalaApi(config.api.key, config.api.secret, {expirationTime: 3600});

/* GET users listing. */
router.get('/', (req, res) => {
  const tokenRequest = api.getTokenRequest(values.EMBED_CODE);
  res.render('live', {
    gender: req.query.gender,
    tokenRequest
  });
});

module.exports = router;
