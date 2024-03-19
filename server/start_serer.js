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
        
        if (data.task == 'login') {
            var username = data['username'];
            var password = data['password'];
            // Read ./private/users.json and check if the user exists and password matches
            var userData = JSON.parse(fs.readFileSync('./private/data.json', 'utf8'));
            var users = userData.users
            var found = false;
            var userfound = false;
            var passwordcorrect = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    userfound = true;
                    if (users[i].password == password) {
                        passwordcorrect = true;
                        found = true;
                    }
                    break;
                }
            }

            if (found) {
                ws.send('true');
            }
            else {
                if (!userfound) {
                    ws.send('false|Username not found');
                }
                else if (!passwordcorrect) {
                    ws.send('false|Incorrect password');
                }
                else {
                ws.send('false|Login failed');
                }
            }
        }
        else if (data.task == 'register') {
            var name = data['name'];
            var username = data['username'];
            var password = data['password'];
            var userData = JSON.parse(fs.readFileSync('./private/data.json', 'utf8'));
            var users = userData.users;
            var found = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    found = true;
                    break;
                }
            }
            if (found) {
                ws.send('false');
            }
            else {
                users.push({name: name, username: username, password: password});
                userData.users = users;
                fs.writeFileSync('./private/data.json', JSON.stringify(userData));
                ws.send('true');
            }
        }

    });
});