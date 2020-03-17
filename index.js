

const express = require('express');
const helmet = require('helmet')
var path = require('path');

const app = express();
const randomstring = require("randomstring");

app.use(helmet({
    frameguard: false,
}));

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    delete req.headers['X-Frame-Options'];
    res.sendFile(path.join(__dirname + '/index.html'))
});


const GENDER = ["MALE", "FEMALE"]
let count = 0;

app.get('/api/user', (req, res) => {
    delete req.headers['X-Frame-Options'];
    count += 1;
    const { query: { requestId } } = req;
    const responseJson = {
        id: randomstring.generate(13),
        adId: requestId,
        salutation: GENDER[Math.round(Math.random())],
        firstname: randomstring.generate({
            length: 5,
            charset: 'alphabetic'
        }),
        lastname: randomstring.generate({
            length: 5,
            charset: 'alphabetic'
        }),
        birthday: "1999-12-25",
        phoneNumber: "0049" + randomstring.generate({
            length: 9,
            charset: 'numeric'
        }),
        email: randomstring.generate({
            length: 5,
            charset: 'alphabetic'
        }) + randomstring.generate({
            length: 4,
            charset: 'numeric'
        }) + "@ssssss.sdf",
        schufaAgreementAccepted: (Math.round(Math.random()) > 0),
        newsletterSubscription: (Math.round(Math.random()) > 0)
    }
    if (count % 2 === 0) {
        res.json(responseJson)
    }
    else {
        setTimeout(() => {
            res.json(responseJson)
        }, 10000)
    }

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));