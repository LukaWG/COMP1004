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
                ws.send(`true|${username}|${users[i].name}`);
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
            console.log(name, username, password);
            var userFile = fs.readFileSync('./private/data.json', 'utf8');
            // Check file conforms to JSON
            try {
                var userData = JSON.parse(userFile);
            }
            catch (e) {
                console.log(e);
                ws.send('false|Error reading user data');
                return;
            }
            // Check that userData.users exists
            if (!userData.users) {
                // If userData.users does not exist, create it
                userData.users = [];
            }
            var users = userData.users;
            var found = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    found = true;
                    break;
                }
            }
            if (found) {
                ws.send('false|User already exists');
            }
            else {
                // Console log time
                console.log('Current time:', new Date());
                console.log('users1:', users);
                users.push({name: name, username: username, password: password});
                console.log('users2:', users);
                userData.users = users;
                fs.writeFileSync('./private/data.json', JSON.stringify(userData, null, 4));
                ws.send(`true|${username}|${name}`);
            }
        }

        else if (data.task == 'new_reminder') {
            var username = data['username'];
            var reminder = data['reminder'];
            var attempts = data['attempts'];
            var reminderFile = fs.readFileSync('./private/reminders.json', 'utf8');
            try {
                var reminderData = JSON.parse(reminderFile);
            }
            catch (e) {
                console.log(e);
                ws.send(`false|try_again|${attempts+1}|Error reading reminder data`);
                return;
            }
            if (!reminderData) {
                reminderData = {};
            }
            // Search for username in reminders and if user has no reminders, create an empty array
            if (!reminderData[username]) {
                // Create new reminder for username
                reminderData[username] = [];
            }

            // Assign an ID to reminder that has not been used by the user before
            var id = 1;
            var found = false;
            while (!found) {
                found = true;
                for (var i = 0; i < reminderData[username].length; i++) {
                    if (reminderData[username][i].id == id) {
                        found = false;
                        id++;
                        break;
                    }
                }
            }

            reminder.id = id;

            reminderData[username].push(reminder);

            fs.writeFileSync('./private/reminders.json', JSON.stringify(reminderData, null, 4));
            ws.send('true|Reminder added');
        }

        else if (data.task == 'get_reminders') {
            var username = data['username'];
            var reminderFile = fs.readFileSync('./private/reminders.json', 'utf8');
            try {
                var reminderData = JSON.parse(reminderFile);
            }
            catch (e) {
                console.log(e);
                ws.send('false|Error reading reminder data');
                return;
            }
            if (!reminderData[username]) {
                ws.send('true|No reminders');
            }
            else {
                console.log("HERE");
                ws.send(`true|${JSON.stringify(reminderData[username])}`);
            }
        }

        else if (data.task == 'complete_reminder') {
            var username = data['username'];
            var id = data['id'];
            var reminderFile = fs.readFileSync('./private/reminders.json', 'utf8');
            try {
                var reminderData = JSON.parse(reminderFile);
            }
            catch (e) {
                console.log(e);
                ws.send('false|Error reading reminder data');
                return;
            }
            if (!reminderData[username]) {
                ws.send('false|No reminders');
            }
            else {
                var found = false;
                for (var i = 0; i < reminderData[username].length; i++) {
                    if (reminderData[username][i].id == id) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    reminderData[username].splice(i, 1);
                    fs.writeFileSync('./private/reminders.json', JSON.stringify(reminderData, null, 4));
                    ws.send('true|Reminder completed');
                }
                else {
                    ws.send('false|Reminder not found');
                }
            }
        }

        else if (data.task == 'edit_reminder') {
            var username = data['username'];
            var reminder = data['reminder'];
            var id = reminder['id'];
            var reminderFile = fs.readFileSync('./private/reminders.json', 'utf8');
            try {
                var reminderData = JSON.parse(reminderFile);
            }
            catch (e) {
                console.log(e);
                ws.send('false|Error reading reminder data');
                return;
            }
            if (!reminderData[username]) {
                ws.send('false|No reminders');
            }
            else {
                var found = false;
                for (var i = 0; i < reminderData[username].length; i++) {
                    console.log(reminderData[username][i].id, id)
                    if (reminderData[username][i].id == id) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    reminderData[username][i] = reminder;
                    fs.writeFileSync('./private/reminders.json', JSON.stringify(reminderData, null, 4));
                    ws.send('true|Reminder edited');
                }
                else {
                    ws.send('false|Reminder not found');
                }
            }
        }
    });
});