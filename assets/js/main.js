// Load functions on page load
$(document).ready(function () {
    // Display the current day
    displayDay()
    // Display the current schedule
    displaySchedule();
});

/////
/////

// Get current day paragraph to display date/time
let currentDay = $('#currentDay');

// Create the function to display the date/time
function displayDay() {
    // New variable to store the current day info
    let currentInfo = moment().format('DD MMM YYYY [at] hh:mm:ss a');
    // Replace the text with updated info
    currentDay.text(currentInfo);
}

// Call displayDay function every 1s
setInterval(displayDay, 1000);

/////
/////

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
        // Create the time block div, add class row
        let timeBlock = $('<div>').attr('class', 'row time-block');

        // Get the hour (on the hour e.g. 9:00am)
        let hour = moment().hour(i).minute(0).second(0);

        // Check if there is data saved in local storage for this hour
        if (localStorage.getItem(hour.format('h:mma'))) {
            // If there is data saved, add a class to the timeBlock div
            timeBlock.addClass('data');
        }

        // Create a p tag for the hour, and add text
        let timeParagraph = $('<p>').text(hour.format('h:mma')).attr('class', 'col-2 hour');
        // Create an input field for the users inputted description (stored in local)
        let customDesc = $('<textarea>').attr('type', 'text').val(localStorage.getItem(hour.format('h:mma'))).attr('class', 'col-8');
        // Create a button to save the task
        let saveButton = $('<button>').attr('class', 'saveBtn col-2');
        // Create the font awesome icon within the button
        let icon = $('<i>').attr('class', 'fa fa-solid fa-bookmark');
        saveButton.append(icon);

        // Append the paragraph, textarea and button to the time block div
        timeBlock.append(timeParagraph, customDesc, saveButton);
        // Append the time block to the container
        container.append(timeBlock);

        /////
        /////

        // Add click event to save button
        saveButton.on('click', function () {
            // Get the task input value
            let description = customDesc.val();
            // Check if the description is empty
            if (description === '') {
                // If the description is empty, remove the item from local storage
                localStorage.removeItem(hour.format('h:mma'));
                // Remove the class 'data'
                timeBlock.removeClass('data');
            } else {
                // If the description is not empty, add class 'data'
                timeBlock.addClass('data');
                // Save the task input value to local storage
                localStorage.setItem(hour.format('h:mma'), description);
            }
        });

        /////
        /////

        if (hour.isBefore(moment(), 'hour')) {
            // If the hour has passed, add class 'past'
            customDesc.addClass('past');
        } else if (hour.isSame(moment(), 'hour')) {
            // If the hour is current, add class 'current'
            customDesc.addClass('current');
        } else if (hour.isAfter(moment(), 'hour')) {
            // If the hour is upcoming, add class 'future'
            customDesc.addClass('future');
        }
    }
}

/////
/////

function init() {
    let currentTime = moment().format('h:mma');
    if (currentTime === '12:00am') {
        localStorage.clear();
    }
}

/////
/////

let nextHour = moment().startOf('hour').add(1, 'hour');
let timeLeft = nextHour.diff(moment());

setTimeout(displaySchedule, timeLeft);