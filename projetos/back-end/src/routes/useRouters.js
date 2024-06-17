const express = require('express');
const router = express.Router();
const connection = require('../db'); // Ajuste conforme necessário

router.get('/tournaments', (req, res) => {
  connection.query('SELECT * FROM tournaments', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
