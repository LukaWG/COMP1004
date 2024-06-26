// TODO
// [X]: Read reminders from server
// [ ]: Display reminders in calendar
//      [ ]: Reminders display in correct cell without the text

var alertTimeout = {timeout: undefined, type: '', classRemove: undefined};

window.isLoggedIn = false;
window.theme = 'light';
// Iterate through every item in logged-in class and add to disabled class
var items = document.getElementsByClassName('logged-in');
for (var i = 0; i < items.length; i++) {
    items[i].classList.add('disabled');
}

// Iterate through all items in the table and give them a grey background
var items = document.getElementsByClassName('table-data');
for (var i = 0; i < items.length; i++) {
    items[i].style.backgroundColor = '#e2e2e2';
    items[i].style.color = '#989898';
}

// Template for reminder
var reminder_template = `
<!-- Display reminder: Checkmark and title, and then description underneath -->
<div class="reminder logged-in card mb-2" id="reminder{{ID}}" onclick="edit_reminder({{ID}});">
    <!-- Display check mark -->
    <div class="card-header">
        <input class="form-check-input me-2 lead align-items-center" type="checkbox" id="complete-reminder-{{ID}}" onclick="submit_reminder(this)">
        <span class="reminder-title lead align-items-center" id="reminder-title1">{{TITLE}}</span>
    </div>
    <div class="ms-1">
        <!-- Hide data with ID of reminder -->
        <span class="reminder-ID" aria-hidden="true" hidden>{{ID}}</span>
        <span {{TOOLTIP}}class="reminder-description" id="reminder-description1">{{DESCRIPTION_SHORT}}</span>
    </div>
</div>`;

class Calendar_Data {
    constructor() {
        var date = new Date();
        var day = date.getDay();
        var diff = date.getDate() - day + (day == 0 ? -6:1);

        this.monday = new Date(date.setDate(diff));

        this.tuesday = new Date(this.monday.setDate(this.monday.getDate() + 1));
        this.monday.setDate(this.monday.getDate() - 1);

        this.wednesday = new Date(this.tuesday.setDate(this.tuesday.getDate() + 1));
        this.tuesday.setDate(this.tuesday.getDate() - 1);

        this.thursday = new Date(this.wednesday.setDate(this.wednesday.getDate() + 1));
        this.wednesday.setDate(this.wednesday.getDate() - 1);

        this.friday = new Date(this.thursday.setDate(this.thursday.getDate() + 1));
        this.thursday.setDate(this.thursday.getDate() - 1);

        this.saturday = new Date(this.friday.setDate(this.friday.getDate() + 1));
        this.friday.setDate(this.friday.getDate() - 1);

        this.sunday = new Date(this.saturday.setDate(this.saturday.getDate() + 1));
        this.saturday.setDate(this.saturday.getDate() - 1);

        this.monday2 = new Date(this.sunday.setDate(this.sunday.getDate() + 1));
        this.sunday.setDate(this.sunday.getDate() - 1);

        this.tuesday2 = new Date(this.monday2.setDate(this.monday2.getDate() + 1));
        this.monday2.setDate(this.monday2.getDate() - 1);

        this.wednesday2 = new Date(this.tuesday2.setDate(this.tuesday2.getDate() + 1));
        this.tuesday2.setDate(this.tuesday2.getDate() - 1);

        this.thursday2 = new Date(this.wednesday2.setDate(this.wednesday2.getDate() + 1));
        this.wednesday2.setDate(this.wednesday2.getDate() - 1);

        this.friday2 = new Date(this.thursday2.setDate(this.thursday2.getDate() + 1));
        this.thursday2.setDate(this.thursday2.getDate() - 1);

        this.saturday2 = new Date(this.friday2.setDate(this.friday2.getDate() + 1));
        this.friday2.setDate(this.friday2.getDate() - 1);

        this.sunday2 = new Date(this.saturday2.setDate(this.saturday2.getDate() + 1));
        this.saturday2.setDate(this.saturday2.getDate() - 1);
    }

    next_week() {
        this.monday.setDate(this.monday.getDate() + 7);
        this.tuesday.setDate(this.tuesday.getDate() + 7);
        this.wednesday.setDate(this.wednesday.getDate() + 7);
        this.thursday.setDate(this.thursday.getDate() + 7);
        this.friday.setDate(this.friday.getDate() + 7);
        this.saturday.setDate(this.saturday.getDate() + 7);
        this.sunday.setDate(this.sunday.getDate() + 7);

        this.monday2.setDate(this.monday2.getDate() + 7);
        this.tuesday2.setDate(this.tuesday2.getDate() + 7);
        this.wednesday2.setDate(this.wednesday2.getDate() + 7);
        this.thursday2.setDate(this.thursday2.getDate() + 7);
        this.friday2.setDate(this.friday2.getDate() + 7);
        this.saturday2.setDate(this.saturday2.getDate() + 7);
        this.sunday2.setDate(this.sunday2.getDate() + 7);

        load_calendar();
        updateReminders();
    }
    previous_week() {
        this.monday.setDate(this.monday.getDate() - 7);
        this.tuesday.setDate(this.tuesday.getDate() - 7);
        this.wednesday.setDate(this.wednesday.getDate() - 7);
        this.thursday.setDate(this.thursday.getDate() - 7);
        this.friday.setDate(this.friday.getDate() - 7);
        this.saturday.setDate(this.saturday.getDate() - 7);
        this.sunday.setDate(this.sunday.getDate() - 7);

        this.monday2.setDate(this.monday2.getDate() - 7);
        this.tuesday2.setDate(this.tuesday2.getDate() - 7);
        this.wednesday2.setDate(this.wednesday2.getDate() - 7);
        this.thursday2.setDate(this.thursday2.getDate() - 7);
        this.friday2.setDate(this.friday2.getDate() - 7);
        this.saturday2.setDate(this.saturday2.getDate() - 7);
        this.sunday2.setDate(this.sunday2.getDate() - 7);

        load_calendar();
        updateReminders();
    }
    this_week() {
        var date = new Date();
        var day = date.getDay();
        var diff = date.getDate() - day + (day == 0 ? -6:1);

        this.monday = new Date(date.setDate(diff));

        this.tuesday = new Date(this.monday.setDate(this.monday.getDate() + 1));
        this.monday.setDate(this.monday.getDate() - 1);

        this.wednesday = new Date(this.tuesday.setDate(this.tuesday.getDate() + 1));
        this.tuesday.setDate(this.tuesday.getDate() - 1);

        this.thursday = new Date(this.wednesday.setDate(this.wednesday.getDate() + 1));
        this.wednesday.setDate(this.wednesday.getDate() - 1);

        this.friday = new Date(this.thursday.setDate(this.thursday.getDate() + 1));
        this.thursday.setDate(this.thursday.getDate() - 1);

        this.saturday = new Date(this.friday.setDate(this.friday.getDate() + 1));
        this.friday.setDate(this.friday.getDate() - 1);

        this.sunday = new Date(this.saturday.setDate(this.saturday.getDate() + 1));
        this.saturday.setDate(this.saturday.getDate() - 1);

        this.monday2 = new Date(this.sunday.setDate(this.sunday.getDate() + 1));
        this.sunday.setDate(this.sunday.getDate() - 1);

        this.tuesday2 = new Date(this.monday2.setDate(this.monday2.getDate() + 1));
        this.monday2.setDate(this.monday2.getDate() - 1);

        this.wednesday2 = new Date(this.tuesday2.setDate(this.tuesday2.getDate() + 1));
        this.tuesday2.setDate(this.tuesday2.getDate() - 1);

        this.thursday2 = new Date(this.wednesday2.setDate(this.wednesday2.getDate() + 1));
        this.wednesday2.setDate(this.wednesday2.getDate() - 1);

        this.friday2 = new Date(this.thursday2.setDate(this.thursday2.getDate() + 1));
        this.thursday2.setDate(this.thursday2.getDate() - 1);

        this.saturday2 = new Date(this.friday2.setDate(this.friday2.getDate() + 1));
        this.friday2.setDate(this.friday2.getDate() - 1);

        this.sunday2 = new Date(this.saturday2.setDate(this.saturday2.getDate() + 1));
        this.saturday2.setDate(this.saturday2.getDate() - 1);

        load_calendar();
        updateReminders();
    }
    get_today() {
        // Get today's date and work out which cell matches it
        var date = new Date();
        var diff = date.getDate();
        var today = new Date(date.setDate(diff));
        var today_date = today.getDate();
        var today_month = today.getMonth();
        var today_year = today.getFullYear();
        
        if (today_date == this.monday.getDate() && today_month == this.monday.getMonth() && today_year == this.monday.getFullYear()) {
            return ['date1', 'cal1'];
        }
        else if (today_date == this.tuesday.getDate() && today_month == this.tuesday.getMonth() && today_year == this.tuesday.getFullYear()) {
            return ['date2', 'cal2'];
        }
        else if (today_date == this.wednesday.getDate() && today_month == this.wednesday.getMonth() && today_year == this.wednesday.getFullYear()) {
            return ['date3', 'cal3'];
        }
        else if (today_date == this.thursday.getDate() && today_month == this.thursday.getMonth() && today_year == this.thursday.getFullYear()) {
            return ['date4', 'cal4'];
        }
        else if (today_date == this.friday.getDate() && today_month == this.friday.getMonth() && today_year == this.friday.getFullYear()) {
            return ['date5', 'cal5'];
        }
        else if (today_date == this.saturday.getDate() && today_month == this.saturday.getMonth() && today_year == this.saturday.getFullYear()) {
            return ['date6', 'cal6'];
        }
        else if (today_date == this.sunday.getDate() && today_month == this.sunday.getMonth() && today_year == this.sunday.getFullYear()) {
            return ['date7', 'cal7'];
        }
        else if (today_date == this.monday2.getDate() && today_month == this.monday2.getMonth() && today_year == this.monday2.getFullYear()) {
            return ['date8', 'cal8'];
        }
        else if (today_date == this.tuesday2.getDate() && today_month == this.tuesday2.getMonth() && today_year == this.tuesday2.getFullYear()) {
            return ['date9', 'cal9'];
        }
        else if (today_date == this.wednesday2.getDate() && today_month == this.wednesday2.getMonth() && today_year == this.wednesday2.getFullYear()) {
            return ['date10', 'cal10'];
        }
        else if (today_date == this.thursday2.getDate() && today_month == this.thursday2.getMonth() && today_year == this.thursday2.getFullYear()) {
            return ['date11', 'cal11'];
        }
        else if (today_date == this.friday2.getDate() && today_month == this.friday2.getMonth() && today_year == this.friday2.getFullYear()) {
            return ['date12', 'cal12'];
        }
        else if (today_date == this.saturday2.getDate() && today_month == this.saturday2.getMonth() && today_year == this.saturday2.getFullYear()) {
            return ['date13', 'cal13'];
        }
        else if (today_date == this.sunday2.getDate() && today_month == this.sunday2.getMonth() && today_year == this.sunday2.getFullYear()) {
            return ['date14', 'cal14'];
        }
        else {
            return 'none';
        }
    }
}

const calendar_data = new Calendar_Data();

class Reminder {
    constructor(title, date, description, id=undefined) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.description = description
        this.completed = false;
    }
}

var reminders = [];
class User {
    constructor() {
        this.name = undefined;
        this.username = undefined;
        this.loggedIn = false;
    }
    logIn(name, username) {
        this.name = name;
        this.username = username;
        this.loggedIn = true;
    }
    logOut() {
        this.name = undefined;
        this.username = undefined;
        this.loggedIn = false;
    }
    get_name() {
        return this.name;
    }
    get_username() {
        return this.username;
    }
}

var user = new User();

function register() {
    // Add user to database with required error checking
    // Check passwords match
    var password = document.getElementById('passwordreg').value;
    var password2 = document.getElementById('passwordreg2').value;
    if (password != password2) {
        show_alert('alert-danger', 'Passwords do not match');
        return;
    }
    // Connect to server using socket (port 8000) and send username and password
    // Get hostname and remove http:// or https:// and remove any trailing slashes and remove port
    var hostname = window.location.hostname;
    if (hostname.substring(0, 7) == 'http://') {
        hostname = hostname.substring(7);
    }
    else if (hostname.substring(0, 8) == 'https://') {
        hostname = hostname.substring(8);
    }
    while (hostname.substring(hostname.length - 1) == '/') {
        hostname = hostname.substring(0, hostname.length - 1);
    }

    var ws = new WebSocket('ws://' + hostname + ':8000');

    // Connection opened
    ws.addEventListener('open', function (event) {
        var data = {
            task: 'register',
            name: document.getElementById('namereg').value,
            username: document.getElementById('usernamereg').value,
            password: password,
        };
        ws.send(JSON.stringify(data));
    });

    // Listen for messages
    ws.addEventListener('message', function (event) {
        var message = event.data.split('|');
        if (message[0] == 'true') {
            register2(username=message[1], name=message[2]);
            ws.close();
            return true;
        }
        else {
            // If first part of message is false then continue
            if (event.data.substring(0, 5) == 'false') {
                // Split message by | and show second part
                var message = event.data.split('|');
                show_alert('alert-danger', message[1]);
                ws.close();
                return false;
            }
        }
    });
    // If got this far then register successful
}

function register2(username=undefined, name=undefined) {
    // If got this far then register successful
    // Hide register modal
    $('#register-modal').modal('hide');

    // show register alert div
    // document.getElementById('register-alert').style.top = '2vh';
    show_alert('alert-success', 'Registered successfully');
    login2(false, name=name, username=username);


}

function find_user(username, password) {
    // Connect to server using socket (port 8000) and send username and password
    // Get hostname and remove http:// or https:// and remove any trailing slashes and remove port
    var hostname = window.location.hostname;
    if (hostname.substring(0, 7) == 'http://') {
        hostname = hostname.substring(7);
    }
    else if (hostname.substring(0, 8) == 'https://') {
        hostname = hostname.substring(8);
    }
    while (hostname.substring(hostname.length - 1) == '/') {
        hostname = hostname.substring(0, hostname.length - 1);
    }

    var ws = new WebSocket('ws://' + hostname + ':8000');

    // Connection opened
    ws.addEventListener('open', function (event) {
        var data = {
            task: 'login',
            username: username,
            password: password
        };
        ws.send(JSON.stringify(data));
    });

    // Listen for messages
    ws.addEventListener('message', function (event) {
        // Split event.data by |
        var message = event.data.split('|');
        if (message[0] == 'true') {
            login2(true, name=message[2], username=message[1]);
            ws.close();
            return true;
        }
        else {
            login_failed();
            ws.close();
            return false;
        }
    });
}

function login(username=null, password=null) {
    // Check user database for user and password
    if (username == null) {
        username = document.getElementById('username').value;
    }
    if (password == null) {
        password = document.getElementById('password').value;
    }

    // Check that both username and password are not blank
    if (username == '' || password == '') {
        return;
    }
    else {
        var user_exists = find_user(username, password);
        if (!user_exists) {
            return;
        }
    }
}

function login2(alert=true, name=undefined, username=undefined) {
    // If got this far then login successful
    // Store user data in user object
    user.logIn(name, username);
    window.isLoggedIn = true;
    document.getElementById('log-in-button').style.display = 'none';
    document.getElementById('log-out-button').style.display = 'block'; 
    // Iterate through every item in logged-in class and remove from disabled class
    var items = document.getElementsByClassName('logged-in');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('disabled');
        // items[i].classList.add('active');
    }

    // Iterate through all items in the table and give them a blank background
    var items = document.getElementsByClassName('table-data');
    for (var i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = '';
        items[i].style.color = '';
    }

    // Get width of log-out button and set width of log-in button to the same
    var width = document.getElementById('log-out-button').offsetWidth;
    document.getElementById('log-in-button').style.width = width + 'px';

    // Load reminders
    getReminders();

    // If got this far then log in successful
    // Hide log in modal
    $('#log-in-modal').modal('hide');

    // show log in alert div
    // document.getElementById('log-in-alert').style.top = '2vh';
    if (alert) {
        show_alert('alert-success', 'Logged in successfully');
    }

    // Set timeout to hide alert
    // setTimeout(hide_log_in_alert, 3500);

    // Load calendar
    load_calendar();
}

function login_failed() {
    // If got this far then log in failed
    // show log in alert div
    // document.getElementById('log-in-failed-alert').style.top = '2vh';
    show_alert('alert-danger', 'Log in failed');

    // Set timeout to hide alert
    // setTimeout(hide_log_in_failed_alert, 3500);

}

function logout() {
    window.isLoggedIn = false;
    user.logOut();
    document.getElementById('log-in-button').style.display = 'block';
    document.getElementById('log-out-button').style.display = 'none'; 
    // Iterate through every item in logged-in class and add to disabled class
    var items = document.getElementsByClassName('logged-in');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.add('disabled');
        // items[i].classList.remove('active');
    }

    // Iterate through all items in the table and give them a grey background
    var items = document.getElementsByClassName('table-data');
    if (window.theme == 'light') {
        for (var i = 0; i < items.length; i++) {
            items[i].style.backgroundColor = '#e2e2e2';
            items[i].style.color = '#989898';
        }
    }
    else {
        for (var i = 0; i < items.length; i++) {
            items[i].style.backgroundColor = '#3d434a';
            items[i].style.color = '#787878';
        }
    }
    deleteReminders();
}

function load_calendar() {
    // Get date of most recent Monday
    var monday = calendar_data.monday;
    var monday_date = monday.getDate();
    var monday_month = monday.getMonth() + 1;
    var monday_year = monday.getFullYear();

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];

    // Make monday_date 2 digit number followed by month
    if (monday_date < 10) {
        monday_date = '0' + monday_date;
    }
    
    monday_date = monday_date + ' ' + months[monday_month - 1] + ' ' + monday_year;
    document.getElementById('date1').innerHTML = monday_date;



    // Repeat process for following 13 days
    var tuesday = calendar_data.tuesday;
    var tuesday_date = tuesday.getDate();
    var tuesday_month = tuesday.getMonth() + 1;
    var tuesday_year = tuesday.getFullYear();

    if (tuesday_date < 10) {
        tuesday_date = '0' + tuesday_date;
    }

    tuesday_date = tuesday_date + ' ' + months[tuesday_month - 1] + ' ' + tuesday_year;
    document.getElementById('date2').innerHTML = tuesday_date;



    var wednesday = calendar_data.wednesday;
    var wednesday_date = wednesday.getDate();
    var wednesday_month = wednesday.getMonth() + 1;
    var wednesday_year = wednesday.getFullYear();

    if (wednesday_date < 10) {
        wednesday_date = '0' + wednesday_date;
    }

    wednesday_date = wednesday_date + ' ' + months[wednesday_month - 1] + ' ' + wednesday_year;
    document.getElementById('date3').innerHTML = wednesday_date;



    var thursday = calendar_data.thursday;
    var thursday_date = thursday.getDate();
    var thursday_month = thursday.getMonth() + 1;
    var thursday_year = thursday.getFullYear();

    if (thursday_date < 10) {
        thursday_date = '0' + thursday_date;
    }

    thursday_date = thursday_date + ' ' + months[thursday_month - 1] + ' ' + thursday_year;
    document.getElementById('date4').innerHTML = thursday_date;



    var friday = calendar_data.friday;
    var friday_date = friday.getDate();
    var friday_month = friday.getMonth() + 1;
    var friday_year = friday.getFullYear();

    if (friday_date < 10) {
        friday_date = '0' + friday_date;
    }

    friday_date = friday_date + ' ' + months[friday_month - 1] + ' ' + friday_year;
    document.getElementById('date5').innerHTML = friday_date;



    var saturday = calendar_data.saturday;
    var saturday_date = saturday.getDate();
    var saturday_month = saturday.getMonth() + 1;
    var saturday_year = saturday.getFullYear();

    if (saturday_date < 10) {
        saturday_date = '0' + saturday_date;
    }

    saturday_date = saturday_date + ' ' + months[saturday_month - 1] + ' ' + saturday_year;
    document.getElementById('date6').innerHTML = saturday_date;



    var sunday = calendar_data.sunday;
    var sunday_date = sunday.getDate();
    var sunday_month = sunday.getMonth() + 1;
    var sunday_year = sunday.getFullYear();

    if (sunday_date < 10) {
        sunday_date = '0' + sunday_date;
    }

    sunday_date = sunday_date + ' ' + months[sunday_month - 1] + ' ' + sunday_year;
    document.getElementById('date7').innerHTML = sunday_date;



    var monday2 = calendar_data.monday2;
    var monday2_date = monday2.getDate();
    var monday2_month = monday2.getMonth() + 1;
    var monday2_year = monday2.getFullYear();

    if (monday2_date < 10) {
        monday2_date = '0' + monday2_date;
    }

    monday2_date = monday2_date + ' ' + months[monday2_month - 1] + ' ' + monday2_year;
    document.getElementById('date8').innerHTML = monday2_date;



    var tuesday2 = calendar_data.tuesday2;
    var tuesday2_date = tuesday2.getDate();
    var tuesday2_month = tuesday2.getMonth() + 1;
    var tuesday2_year = tuesday2.getFullYear();

    if (tuesday2_date < 10) {
        tuesday2_date = '0' + tuesday2_date;
    }

    tuesday2_date = tuesday2_date + ' ' + months[tuesday2_month - 1] + ' ' + tuesday2_year;
    document.getElementById('date9').innerHTML = tuesday2_date;



    var wednesday2 = calendar_data.wednesday2;
    var wednesday2_date = wednesday2.getDate();
    var wednesday2_month = wednesday2.getMonth() + 1;
    var wednesday2_year = wednesday2.getFullYear();

    if (wednesday2_date < 10) {
        wednesday2_date = '0' + wednesday2_date;
    }

    wednesday2_date = wednesday2_date + ' ' + months[wednesday2_month - 1] + ' ' + wednesday2_year;
    document.getElementById('date10').innerHTML = wednesday2_date;



    var thursday2 = calendar_data.thursday2;
    var thursday2_date = thursday2.getDate();
    var thursday2_month = thursday2.getMonth() + 1;
    var thursday2_year = thursday2.getFullYear();

    if (thursday2_date < 10) {
        thursday2_date = '0' + thursday2_date;
    }

    thursday2_date = thursday2_date + ' ' + months[thursday2_month - 1] + ' ' + thursday2_year;
    document.getElementById('date11').innerHTML = thursday2_date;



    var friday2 = calendar_data.friday2;
    var friday2_date = friday2.getDate();
    var friday2_month = friday2.getMonth() + 1;
    var friday2_year = friday2.getFullYear();

    if (friday2_date < 10) {
        friday2_date = '0' + friday2_date;
    }

    friday2_date = friday2_date + ' ' + months[friday2_month - 1] + ' ' + friday2_year;
    document.getElementById('date12').innerHTML = friday2_date;



    var saturday2 = calendar_data.saturday2;
    var saturday2_date = saturday2.getDate();
    var saturday2_month = saturday2.getMonth() + 1;
    var saturday2_year = saturday2.getFullYear();

    if (saturday2_date < 10) {
        saturday2_date = '0' + saturday2_date;
    }

    saturday2_date = saturday2_date + ' ' + months[saturday2_month - 1] + ' ' + saturday2_year;
    document.getElementById('date13').innerHTML = saturday2_date;



    var sunday2 = calendar_data.sunday2;
    var sunday2_date = sunday2.getDate();
    var sunday2_month = sunday2.getMonth() + 1;
    var sunday2_year = sunday2.getFullYear();

    if (sunday2_date < 10) {
        sunday2_date = '0' + sunday2_date;
    }

    sunday2_date = sunday2_date + ' ' + months[sunday2_month - 1] + ' ' + sunday2_year;
    document.getElementById('date14').innerHTML = sunday2_date;


    // Iterate through all items and remove class table-primary
    var items = document.getElementsByClassName('table-data');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('table-primary');
        items[i].classList.remove('no-border');
    }
    // Highlight today's date
    var today = calendar_data.get_today();
    
    if (today != 'none') {
        document.getElementById(today[0]).classList.add('table-primary');
        document.getElementById(today[0]).classList.add('no-border');
    }
}

// Use JS to calc height to the bottom of the page to expand the table
function expand_table() {
    var height = document.getElementById('table').offsetHeight;
    var bottom = document.getElementById('body').offsetHeight;
    var total = bottom - height;
    document.getElementById('table').style.height = total + 'px';
}

function show_alert(type, text) {
    // Clear previous alert timeout
    if (alertTimeout.timeout != undefined) {
        clearTimeout(alertTimeout.timeout);
        alertTimeout.timeout = undefined;
    }
    if (alertTimeout.type != '') {
        remove_alert_class(alertTimeout.type);
    }
    if (alertTimeout.classRemove != undefined) {
        clearTimeout(alertTimeout.classRemove);
        remove_alert_class();
    }
    // Set text of alert
    document.getElementById('alert').innerHTML = text;
    // show alert div
    document.getElementById('alert').style.top = '2vh';
    // add class type to alert
    document.getElementById('alert').classList.add(type);
    alertTimeout.type = type;
    // Set timeout to hide alert
    alertTimeout.timeout = setTimeout(hide_alert, 3500);
}

function hide_alert() {
    alertTimeout.timeout = undefined;

    document.getElementById('alert').style.top = '-70px';
    // remove class type from alert
    alertTimeout.classRemove = setTimeout(remove_alert_class, 1000);
}

function remove_alert_class() {
    document.getElementById('alert').classList.remove(alertTimeout.type);
    alertTimeout.type = '';
    alertTimeout.classRemove = undefined;
}

function hide_log_in_alert() {
    document.getElementById('log-in-alert').style.top = '-70px';
}

function hide_log_in_failed_alert() {
    document.getElementById('log-in-failed-alert').style.top = '-70px';
}

function toggle_theme() {
    var body = document.getElementById('body');
    if (window.theme == 'light') {
        body.setAttribute('data-bs-theme', 'dark');
        window.theme = 'dark';
        if (!window.isLoggedIn) {
            var items = document.getElementsByClassName('table-data');
            for (var i = 0; i < items.length; i++) {
                items[i].style.backgroundColor = '#3d434a';
                items[i].style.color = '#787878';
            }
        }
    }
    else {
        body.setAttribute('data-bs-theme', 'light');
        window.theme = 'light';
        if (!window.isLoggedIn) {
            var items = document.getElementsByClassName('table-data');
            for (var i = 0; i < items.length; i++) {
                items[i].style.backgroundColor = '#e2e2e2';
                items[i].style.color = '#989898';
            }
        }
    }
}

function newReminder() {
    // Get title, due date, and description
    var title = document.getElementById('new-reminder-title').value;
    var date = document.getElementById('new-reminder-due-date').value;
    var description = document.getElementById('new-reminder-description').value;

    // Check that title and due date are not blank
    if (title == '' || date == '') {
        // Show alert that title and due date are required
        show_alert('alert-danger', 'Title and due date are required');
        return;
    }

    // Check that title and description do not contain | character
    if (title.includes('|') || description.includes('|')) {
        // Show alert that title and description cannot contain |
        show_alert('alert-danger', 'Title and description cannot contain |');
        return;
    }

    // Check that due date is in the future
    var today = new Date();
    var due_date = new Date(date);
    if (due_date < today) {
        // Show alert that due date is in the past
        show_alert('alert-danger', 'Due date is in the past');
        return;
    }

    // Create new reminder object
    var reminder = new Reminder(title=title, date=date, description=description);
    // Add reminder to database
    // reminders.push(reminder);
    // Send reminder to server
    // Get hostname and remove http:// or https:// and remove any trailing slashes and remove port
    var hostname = window.location.hostname;
    if (hostname.substring(0, 7) == 'http://') {
        hostname = hostname.substring(7);
    }
    else if (hostname.substring(0, 8) == 'https://') {
        hostname = hostname.substring(8);
    }
    while (hostname.substring(hostname.length - 1) == '/') {
        hostname = hostname.substring(0, hostname.length - 1);
    }

    var ws = new WebSocket('ws://' + hostname + ':8000');

    // Connection opened
    ws.addEventListener('open', function (event) {
        var data = {
            task: 'new_reminder',
            username: user.get_username(),
            reminder: reminder,
            attempts: 0,
        };
        ws.send(JSON.stringify(data));
    });

    // Listen for messages

    ws.addEventListener('message', function (event) {
        var message = event.data.split('|');
        if (message[0] == 'true') {
            ws.close();
            // call getReminders to update reminders array in 0.5 seconds
            setTimeout(getReminders, 500);
            return true;
        }
        else {
            // If first part of message is false then continue
            if (event.data.substring(0, 5) == 'false') {
                message = event.data.split('|');
                // Try again
                if (message[1] == 'try_again') {
                    if (message[2] == 'attempts') {
                        if (message[3] < 3) {
                            var data = {
                                task: 'new_reminder',
                                username: user.get_username(),
                                reminder: reminder,
                                attempts: message[3],
                            };
                            ws.send(JSON.stringify(data));
                        }
                        else {
                            show_alert('alert-danger', 'Failed to add reminder');
                            ws.close();
                            return false;
                        }
                    }
                }
                else {
                    show_alert('alert-danger', 'Failed to add reminder');
                    ws.close();
                    return false;
                }
            }
        }
    });
    // Hide new reminder modal
    $('#new-reminder-modal').modal('hide');
    // Show alert that reminder was added
    show_alert('alert-success', 'Reminder added');
    // Clear input boxes
    document.getElementById('new-reminder-title').value = '';
    document.getElementById('new-reminder-due-date').value = '';
    document.getElementById('new-reminder-description').value = '';
    // Load reminders
    // deleteReminders();
    // updateReminders();
}

function getReminders() {
    // Get reminders from server
    // Get hostname and remove http:// or https:// and remove any trailing slashes and remove port
    var hostname = window.location.hostname;
    if (hostname.substring(0, 7) == 'http://') {
        hostname = hostname.substring(7);
    }
    else if (hostname.substring(0, 8) == 'https://') {
        hostname = hostname.substring(8);
    }
    while (hostname.substring(hostname.length - 1) == '/') {
        hostname = hostname.substring(0, hostname.length - 1);
    }

    var ws = new WebSocket('ws://' + hostname + ':8000');

    // Connection opened
    ws.addEventListener('open', function (event) {
        var data = {
            task: 'get_reminders',
            username: user.get_username(),
        };
        ws.send(JSON.stringify(data));
    });

    // Listen for messages
    ws.addEventListener('message', function (event) {
        var message = event.data.split('|');
        if (message[0] == 'true') {
            // Split message by |
            var reminders = JSON.parse(message[1]);
            displayReminders(reminders);
            ws.close();
            return true;
        }
        else {
            // If first part of message is false then continue
            if (event.data.substring(0, 5) == 'false') {
                // Split message by | and show second part
                var message = event.data.split('|');
                show_alert('alert-danger', message[1]);
                ws.close();
                return false;
            }
        }
    });

}

function displayReminders(reminderslist) {
    // Clear reminders array
    reminders = [];
    // Add reminders to reminders array
    for (var i = 0; i < reminderslist.length; i++) {
        var reminder = new Reminder(reminderslist[i].title, reminderslist[i].date, reminderslist[i].description, reminderslist[i].id);
        reminders.push(reminder);
    }
    updateReminders();
}

function updateReminders() {
    deleteReminders();

    // Iterate through reminders array and add to reminders class
    for (var i = 0; i < reminders.length; i++) {
        var reminder = reminders[i];
        var date = new Date(reminder.date);
        var date_string = date.getDate() + ' ' + date.getMonth() + ' ' + date.getFullYear();

        // If description more than 47 characters, remove 3 characters and add ...
        var short_description;
        var tooltip = false;
        if (reminder.description.length > 47) {
            short_description = reminder.description.substring(0, 44) + '...';
            tooltip = true;
        }
        else {
            short_description = reminder.description;
        }

        var reminderHTML = reminder_template.replace('{{ID}}', reminder.id).replace('{{ID}}', reminder.id).replace('{{ID}}', reminder.id).replace('{{TITLE}}', reminder.title).replace('{{DATE}}', date_string).replace('{{DESCRIPTION_SHORT}}', short_description);
        if (tooltip) {
            reminderHTML = reminderHTML.replace('{{TOOLTIP}}', 'data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="' + reminder.description + '"');
        }
        else {
            reminderHTML = reminderHTML.replace('{{TOOLTIP}}', '');
        }

        // Detect if the reminder is clicked

        // // When reminder is clicked open modal with reminder details so they can be edited (use the same modal as new reminder)
        // // Get reminder from reminders array
        // document.getElementById('reminder' + reminder.id).addEventListener('click', function() {
        //     var reminder = reminders[reminder.id];
        //     // Set title, due date, and description to reminder values
        //     document.getElementById('new-reminder-title').value = reminder.title;
        //     document.getElementById('new-reminder-due-date').value = reminder.date;
        //     document.getElementById('new-reminder-description').value = reminder.description;
        //     // Show new reminder modal
        //     $('#new-reminder-modal').modal('show');
        // });

        // Check if reminder date is displayed in current calendar view
        var monday = calendar_data.monday;
        var sunday = calendar_data.sunday2;
        if (date >= monday && date <= sunday) {
            // Calculating the time difference of two dates
            let difference_in_time = date.getTime() - monday.getTime();

            // Calculating the no. of days between two dates
            let cellnum = Math.ceil(difference_in_time / (1000 * 3600 * 24)) + 1;

            var cell_id = 'cal' + cellnum;
            var cell = document.getElementById(cell_id);
            cell.innerHTML += reminderHTML;
        }

        enable_tooltips();

        // var reminder_div = document.createElement('div');
        // reminder_div.classList.add('reminder');
        // var title = document.createElement('p');
        // title.innerHTML = reminder.title;
        // var due_date = document.createElement('p');
        // due_date.innerHTML = date_string;
        // var description = document.createElement('p');
        // description.innerHTML = reminder.description;
        // reminder_div.appendChild(title);
        // reminder_div.appendChild(due_date);
        // reminder_div.appendChild(description);
        // document.getElementById('reminders').appendChild(reminder_div);
    }
}

function deleteReminders() {
    // Iterate through all objects with className reminder and remove from screen
    var items = document.getElementsByClassName('reminder');
    while (items.length > 0) {
        items[0].remove();
    }
}

function submit_reminder(reminder) {
    // Get which reminder from id (complete-reminder-ID)
    var reminder_id = reminder.id.split('-')[2];
    
    // Iterate through reminders array until id matches
    var reminder;
    for (var i = 0; i < reminders.length; i++) {
        if (reminders[i].id == reminder_id) {
            reminder = reminders[i];
            break;
        }
    }
    reminder.completed = true;
    // Send reminder to server
    // Get hostname and remove http:// or https:// and remove any trailing slashes and remove port
    var hostname = window.location.hostname;
    if (hostname.substring(0, 7) == 'http://') {
        hostname = hostname.substring(7);
    }
    else if (hostname.substring(0, 8) == 'https://') {
        hostname = hostname.substring(8);
    }
    while (hostname.substring(hostname.length - 1) == '/') {
        hostname = hostname.substring(0, hostname.length - 1);
    }

    var ws = new WebSocket('ws://' + hostname + ':8000');

    // Connection opened
    ws.addEventListener('open', function (event) {
        var data = {
            task: 'complete_reminder',
            username: user.get_username(),
            id: reminder_id,
        };
        ws.send(JSON.stringify(data));
    });

    // Listen for messages
    ws.addEventListener('message', function (event) {
        var message = event.data.split('|');
        if (message[0] == 'true') {
            ws.close();
            // show_alert('alert-success', 'Reminder completed');
            // remove reminder from reminders array
            // Iterate through reminders array and remove reminder with id
            for (var i = 0; i < reminders.length; i++) {
                if (reminders[i].id == reminder_id) {
                    reminders.splice(i, 1);
                    break;
                }
            }
            updateReminders();
            return true;
        }
        else {
            // If first part of message is false then continue
            if (event.data.substring(0, 5) == 'false') {
                // Split message by | and show second part
                var message = event.data.split('|');
                show_alert('alert-danger', message[1]);
                // Uncheck checkbox
                document.getElementById('complete-reminder-' + id).checked = false;
                ws.close();
                return false;
            }
        }
    });
}

function edit_reminder(reminder_id) {
    // Iterate through reminders array until id matches
    var reminder;
    for (var i = 0; i < reminders.length; i++) {
        if (reminders[i].id == reminder_id) {
            reminder = reminders[i];
            break;
        }
    }

    // Check if the reminder has been completed (check box ticked or reminder deleted from array, therefore reminder is undefined)
    if (reminder == undefined) {
        return;
    }
    else if (reminder.completed) {
        return;
    }

    // Set title, due date, and description to reminder values
    document.getElementById('edit-reminder-title').value = reminder.title;
    document.getElementById('edit-reminder-due-date').value = reminder.date;
    document.getElementById('edit-reminder-description').value = reminder.description;
    document.getElementById('edit-reminder-id').value = reminder_id;
    // Show edit reminder modal
    $('#edit-reminder-modal').modal('show');
}

function editReminderSubmit() {
    // Get title, due date, and description
    var title = document.getElementById('edit-reminder-title').value;
    var date = document.getElementById('edit-reminder-due-date').value;
    var description = document.getElementById('edit-reminder-description').value;
    var reminder_id = document.getElementById('edit-reminder-id').value;

    // Check that title and due date are not blank
    if (title == '' || date == '') {
        // Show alert that title and due date are required
        show_alert('alert-danger', 'Title and due date are required');
        return;
    }

    // Check that title and description do not contain | character
    if (title.includes('|') || description.includes('|')) {
        // Show alert that title and description cannot contain |
        show_alert('alert-danger', 'Title and description cannot contain |');
        return;
    }

    // Iterate through remidners array until reminder_id matches
    var reminder;
    for (var i = 0; i < reminders.length; i++) {
        if (reminders[i].id == reminder_id) {
            reminder = reminders[i];
            break;
        }
    }
    // Update reminder values
    reminder.title = title;
    reminder.date = date;
    reminder.description = description;

    // Send reminder to server
    // Get hostname and remove http:// or https:// and remove any trailing slashes and remove port
    var hostname = window.location.hostname;
    if (hostname.substring(0, 7) == 'http://') {
        hostname = hostname.substring(7);
    }
    else if (hostname.substring(0, 8) == 'https://') {
        hostname = hostname.substring(8);
    }
    while (hostname.substring(hostname.length - 1) == '/') {
        hostname = hostname.substring(0, hostname.length - 1);
    }

    var ws = new WebSocket('ws://' + hostname + ':8000');

    // Connection opened
    ws.addEventListener('open', function (event) {
        var data = {
            task: 'edit_reminder',
            username: user.get_username(),
            reminder: reminder,
            attempts: 0,
        };
        ws.send(JSON.stringify(data));
    });

    // Listen for messages

    ws.addEventListener('message', function (event) {
        var message = event.data.split('|');
        if (message[0] == 'true') {
            ws.close();
            // call getReminders to update reminders array in 0.5 seconds
            setTimeout(getReminders, 500);
            return true;
        }
        else {
            // If first part of message is false then continue
            if (event.data.substring(0, 5) == 'false') {
                message = event.data.split('|');
                // Try again
                if (message[1] == 'try_again') {
                    if (message[2] == 'attempts') {
                        if (message[3] < 3) {
                            var data = {
                                task: 'edit_reminder',
                                username: user.get_username(),
                                reminder: reminder,
                                attempts: message[3],
                            };
                            ws.send(JSON.stringify(data));
                        }
                        else {
                            show_alert('alert-danger', 'Failed to edit reminder');
                            ws.close();
                            return false;
                        }
                    }
                }
                else {
                    show_alert('alert-danger', 'Failed to edit reminder');
                    ws.close();
                    return false;
                }
            }
        }
    });

    // Hide edit reminder modal
    $('#edit-reminder-modal').modal('hide');
}

expand_table();
load_calendar();

// Get width of log-out button and set width of log-in button to the same
var width = document.getElementById('log-out-button').offsetWidth;
document.getElementById('log-in-button').style.width = width + 'px';

// Set log out button to hidden and display log in button
document.getElementById('log-out-button').style.display = 'none';
document.getElementById('log-in-button').style.display = 'block';

try {
    var login_form = document.getElementById('login-form');
    login_form.addEventListener('submit', function(event) {
        event.preventDefault();
        login();
    });

    // Detect when enter is clicked within login_form
    login_form.addEventListener('keyup', function(event) {
        if (event.code == 'Enter') {
            event.preventDefault();
            login();
        }
    });
}
catch (error) {
    console.log('No login form found');
};

try {
    var register_form = document.getElementById('register-form');
    register_form.addEventListener('submit', function(event) {
        event.preventDefault();
        register();
    });
    // Detect when enter is clicked within register_form
    register_form.addEventListener('keyup', function(event) {
        if (event.code == 'Enter') {
            event.preventDefault();
            register();
        }
    });
}
catch (error) {
    console.log('No register form found');
}

$('#log-in-modal').on('hidden.bs.modal', function () {
    // Remove text from input boxes
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
})

$('#register-modal').on('hidden.bs.modal', function () {
    // Remove text from input boxes
    document.getElementById('namereg').value = '';
    document.getElementById('usernamereg').value = '';
    document.getElementById('passwordreg').value = '';
    document.getElementById('passwordreg2').value = '';
})

$('#edit-reminder-modal').on('hidden.bs.modal', function () {
    // Remove text from input boxes
    document.getElementById('edit-reminder-title').value = '';
    document.getElementById('edit-reminder-due-date').value = '';
    document.getElementById('edit-reminder-description').value = '';
})

var tooltipTriggerList;
var tooltipList;

function enable_tooltips() {
    // Enable tooltips
    tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

}
