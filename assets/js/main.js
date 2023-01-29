// Get current day paragraph to display date/time
let currentDay = $('#currentDay');

// Load functions on page load
$(document).ready(function () {
    // Display the current day
    displayDay()
    // Display the current schedule
    displaySchedule();
});

// Create the function to display the date/time
function displayDay() {
    // New variable to store the current day info
    let currentInfo = moment().format('DD MMM YYYY [at] hh:mm:ss a');
    // Replace the text with updated info
    currentDay.text(currentInfo);
}

// Call displayDay function every 1s
setInterval(displayDay, 1000);

////////
////////

// Get the container to display schedule info
let container = $('.container');

// Create the function to display the schedule
function displaySchedule() {
    // Start with empty container
    container.empty();
    // Initialise function
    init();

    // For each hour between 9am and 5pm…
    for (let i = 9; i <= 17; i++) {
        // Create the time block div
        let timeBlock = $('<div>');
        // Get the hour (on the hour)
        let hour = moment().hour(i).minute(0).second(0);
        // Create a p tag for the hour, and add text
        let timeParagraph = $('<p>').text(hour.format('h:mma'));
        // Create an input field for the task
        let customDesc = $('<textarea>').attr('type', 'text').attr('class', 'custom-description').val(localStorage.getItem(hour.format('h:mma')));
        // Create a button to save the task
        let saveButton = $('<button>').attr('class', 'saveBtn fas fa-bookmark');
        // Append the hour, task input and save button to the time block
        timeBlock.append(timeParagraph, customDesc, saveButton);
        // Append the time block to the container
        container.append(timeBlock);

        // Add click event to save button
        saveButton.on('click', function () {
            // Get the task input value
            let taskValue = taskInput.val();
            // Save the task input value to localStorage
            localStorage.setItem(hour.format('h:mma'), taskValue);
        });

        if (hour.isBefore(moment(), 'hour')) {
            // If the hour has passed, add class 'past'
            timeBlock.addClass('past');
        } else if (hour.isSame(moment(), 'hour')) {
            // If the hour is current, add class 'current'
            timeBlock.addClass('current');
        } else if (hour.isAfter(moment(), 'hour')) {
            // If the hour is upcoming, add class 'future'
            timeBlock.addClass('future');
        }
    }
}

function init() {
    let currentTime = moment().format('h:mma');
    if (currentTime === '12:00am') {
        localStorage.clear();
    }
}

let nextHour = moment().startOf('hour').add(1, 'hour');
let timeLeft = nextHour.diff(moment());

setTimeout(displaySchedule, timeLeft);