const express = require('express');
const router = express.Router();

//rota para obter dados do banco de dados
router.get('/dados', (req, res) => {
  connection.query('SELECT * FROM Cadastro', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

module.exports = router;