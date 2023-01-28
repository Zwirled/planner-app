let currentDay = $('#currentDay');

// Load the page with the current day info displayed
currentDay.text(moment().format('DD MMM YYYY [at] hh:mm:ss a'));

function displayDay() {
    // New variable to store the current day info
    let currentInfo = moment().format('DD MMM YYYY [at] hh:mm:ss a');
    // Replace the text with updated info
    currentDay.text(currentInfo);
}

// Call displayDay function every 1s
setInterval(displayDay, 1000);
