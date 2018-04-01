const express = require('express');
const router = express.Router();

const streamNames = require("./util/streamNames")

router.get('/', async (req, res) => {
  res.json(await streamNames())
})

module.exports = router;
