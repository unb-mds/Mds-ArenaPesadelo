const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const port = 3000;

// Use o middleware CORS
app.use(cors());
// Middleware para interpretar o corpo das requisições como JSON
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
