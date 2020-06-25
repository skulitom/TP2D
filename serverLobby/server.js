const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

let server = app.listen(PORT);

app.get('/', (req, res) => {
    res.send('Hello Typer Space!');
});