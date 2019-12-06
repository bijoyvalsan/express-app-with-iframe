

const express = require('express');
const helmet = require('helmet')
var path = require('path');

const app = express();

app.use(helmet({
    frameguard: false,
}));

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    delete req.headers['X-Frame-Options'];
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));