// response.write returns false when response.write is called when checking if the user exists

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
var qs = require('querystring');
const express = require("express");

const app = express();

app.get('/', (req, res) => {
    const html = fs.readFileSync('./index.html', 'utf8');
    res.send(html);
});

app.get('/test.html', (req, res) => {
    const html = fs.readFileSync('./test.html', 'utf8');
    res.send(html);
});

app.get('/js/script.js', (req, res) => {
    const script = fs.readFileSync('./js/script.js', 'utf8');
    res.send(script);
});

app.get('/css/style.css', (req, res) => {
    const css = fs.readFileSync('./css/style.css', 'utf8');
    res.send(css);
});

app.post('/find_user', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const postData = qs.parse(body);
        const data = JSON.parse(postData['data']);
        const username = data['username'];
        const password = data['password'];

        const userData = JSON.parse(fs.readFileSync('./private/data.json', 'utf8'));
        const users = userData.users;
        let found = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                found = true;
                break;
            }
        }
        if (found) {
            console.log(res.send('true'));
            console.log('User found');
        } else {
            res.send('false');
        }
    });
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});