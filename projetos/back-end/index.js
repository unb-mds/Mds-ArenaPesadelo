const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = process.env.PORT || 3000;

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'zlimaz',
  password: '182110',
  database: 'Cadastro'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// importando rota do routes.js
const routes = require('./src/routes/useRouters');
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});