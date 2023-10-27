const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

app.use(express.static('./'));

app.use(express.urlencoded({ extended: true }));

app.post('/submitform', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.appendFile('./submissions.json', data + ',\n', err => {
        if (err) {
            console.log(err);
            res.status(500).send('Error saving submission');
        } else {
            console.log(req.body);
            res.send('Received your request!');
        }
    });
});

app.get('/formsubmissions', (req, res) => {
    fs.readFile('./submissions.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading submissions:', err);
            res.status(500).send('Error reading submissions');
        } else {
            res.send(data);
        }
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});