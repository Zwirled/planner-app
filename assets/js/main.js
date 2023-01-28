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

////////
////////

let container = $('.container');

function displaySchedule() {
    container.empty();
    for (let i = 9; i <= 17; i++) {
        // Create the time block div
        let timeBlock = $('<div>');
        // Get the hour
        let hour = moment().hour(i).minute(0).second(0);
        // Create a p tag
        let timeParagraph = $('<p>');
        // Add hour to the p
        timeParagraph.text(hour.format('h:mma'));
        // Append the p to the time block
        timeBlock.append(timeParagraph);
        // Append the time block to the container
        container.append(timeBlock);

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

// Call displaySchedule function every 1s
setInterval(displaySchedule, 1000);