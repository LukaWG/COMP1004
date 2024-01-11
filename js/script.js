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
        load_events();
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
        load_events();
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
        load_events();
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

function login() {
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

    // If got this far then log in successful
    // Hide log in modal
    $('#log-in-modal').modal('hide');

    // show log in alert div
    document.getElementById('log-in-alert').style.top = '2vh';

    // Set timeout to hide alert
    setTimeout(hide_log_in_alert, 3500);

    // Load calendar
    load_calendar();
}

function logout() {
    window.isLoggedIn = false;
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

function load_events() {

}

// Use JS to calc height to the bottom of the page to expand the table
function expand_table() {
    var height = document.getElementById('table').offsetHeight;
    var bottom = document.getElementById('body').offsetHeight;
    var total = bottom - height;
    document.getElementById('table').style.height = total + 'px';
}

function hide_log_in_alert() {
    document.getElementById('log-in-alert').style.top = '-70px';
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

expand_table();
load_calendar();