// response.write returns false when response.write is called when checking if the user exists

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const webSocket = require('ws');

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

const WebSocket = require('ws');

// Set up server
const wss = new WebSocket.Server({ port: 8000 });

// Wire up some logic for the connection event (when a client connects) 
wss.on('connection', function connection(ws) {

    // Wire up logic for the message event (when a client sends something)
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        // convert received message to JSON object
        var data = JSON.parse(message);
        console.log(data);
        if (data.task == 'login') {
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
                ws.send('true');
                console.log('User found');
            }
            else {
                ws.send('false');
            }
        }

    });
});