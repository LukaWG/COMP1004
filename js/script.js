window.isLoggedIn = false;
// Iterate through every item in logged-in class and add to disabled class
var items = document.getElementsByClassName('logged-in');
for (var i = 0; i < items.length; i++) {
    items[i].classList.add('disabled');
}

function login() {
    window.isLoggedIn = true;
    document.getElementById('log-in-button').style.display = 'none';
    document.getElementById('log-out-button').style.display = 'inline'; 
    // Iterate through every item in logged-in class and remove from disabled class
    var items = document.getElementsByClassName('logged-in');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('disabled');
        // items[i].classList.add('active');
    }
}

function logout() {
    window.isLoggedIn = false;
    document.getElementById('log-in-button').style.display = 'inline';
    document.getElementById('log-out-button').style.display = 'none'; 
    // Iterate through every item in logged-in class and add to disabled class
    var items = document.getElementsByClassName('logged-in');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.add('disabled');
        // items[i].classList.remove('active');
    }
}