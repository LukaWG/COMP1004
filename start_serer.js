// response.write returns false when response.write is called when checking if the user exists

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
var qs = require('querystring');
const express = require("express");

const app = express();

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200);

    if (pathname == '/') {
        var html = fs.readFileSync('./index.html', 'utf8');
        response.write(html);
    }
    else if (pathname == '/test.html') {
        var html = fs.readFileSync('./test.html', 'utf8');
        response.write(html);
    }


    else if (pathname == '/js/script.js') {
        var script = fs.readFileSync('./js/script.js', 'utf8');
        response.write(script);
    }
    else if (pathname == '/css/style.css') {
        var css = fs.readFileSync('./css/style.css', 'utf8');
        response.write(css);
    }
    else if (pathname == '/find_user') {
        if (request.method === 'POST') {
            let body = '';
            request.on('data', (chunk) => {
                body += chunk.toString();
            });
            request.on('end', () => {
                const postData = qs.parse(body);
                // Process the postData here
                var data = JSON.parse(postData['data']);
                var username = data['username'];
                var password = data['password'];
                
                // Read ./private/users.json and check if the user exists and password matches
                var userData = JSON.parse(fs.readFileSync('./private/data.json', 'utf8'));
                var users = userData.users
                var found = false;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username == username && users[i].password == password) {
                        found = true;
                        break;
                    }
                }

                if (found) {
                    console.log(response.write('true'));
                    console.log('User found');
                }
                else {
                    response.write('false');
                }
            });
        } else {
            response.write('Invalid request');
            response.end();
        }
    }
    
    response.end();
}).listen(8080);