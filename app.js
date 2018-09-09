const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.text({ type: 'application/*+json' }));

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page | Book App',
        welcomeMessage: 'Hello Users!'
    });
});

app.post('/addbook', (req, res) => {
    
});

app.post('/', (req, res) => {
    res.status(200).send(res.body);
});

app.listen(3000, () => {
    console.log('Book app server listening at 3000...');
});
