const express = require('express');
const router = express.Router();

const streams = require("./util/streams")

router.get('/', async (req, res) => {
  res.json(await streams())
})

module.exports = router;
