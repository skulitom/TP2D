const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

let server = app.listen(PORT);

app.get('/', (req, res) => {
    res.send('Hello Typer Space!');
});

app.get('getUserDetails/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        userName: 'Skulitom',
        money: 999
    }));
});