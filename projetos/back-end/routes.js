const express = require('express');
const routes = express.Router();

const users = [
    {
        id: 1,
        name: 'Presidente',
        email: 'atleticapesadelo@gmail.com',
        password: '12345678'
    },
    {
        id: 2,
        name: 'dev',
        email: 'miguelarthur1@outlook.com',
        password: '12345678'
    }
];

routes.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        return res.status(200).json(user);
    }

    return res.status(401).json({ message: 'Credenciais Inválidas' });
});

module.exports = routes;
