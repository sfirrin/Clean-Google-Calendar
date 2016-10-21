function setUpCalendarButton() {
    var buttonStrip = document.getElementsByClassName('button-strip')[0];
    console.log('calendar chooser');
    if (buttonStrip) {
        // Stop the interval if we're able to get ahold of the button strip element
        // (B/c the Google async js has loaded the calendar DOM
        clearInterval(addButtonInterval);

        // The Google calendar chooser elements that we're moving to the drop down box
        var calendarChooser = document.getElementById('lhscalinner_my');
        var othersCalendarChooser = document.getElementById('calendars_fav');


        var calButtonTemplate = document.createElement('template');
        calButtonTemplate.innerHTML = '<div class="goog-inline-block goog-imageless-button calendar-button" role="button" aria-expanded="false" tabindex="0"aria-haspopup="true" id="mg-more" style="-webkit-user-select: none;"><div class="goog-inline-block goog-imageless-button-outer-box"><div class="goog-inline-block">Calendars</div><div class="goog-inline-block more-arrow"></div></div></div>';
        var calendarButton = calButtonTemplate.content.firstChild;
        buttonStrip.appendChild(calendarButton);

        // Creating the drop-down box for the calendar selectors
        var calBoxTemplate = document.createElement('template');
        calBoxTemplate.innerHTML = '<div id="cal-box" class="goog-menu goog-menu-vertical" role="menu" aria-haspopup="true" style="-webkit-user-select: none; margin: 20px; width: 400px; visibility: visible; " aria-activedescendant=":h"></div>';
        var calBox = calBoxTemplate.content.firstChild;

        calBox.className += ' cal-box cal-box-inactive';

        calendarChooser.classList.add('cal-chooser');
        othersCalendarChooser.classList.add('cal-chooser');
        calBox.appendChild(calendarChooser);
        calBox.appendChild(othersCalendarChooser);

        var body = document.getElementsByTagName('body')[0];
        body.appendChild(calBox);

        calendarButton.addEventListener('click', function (event) {
            if (calendarButton.classList.contains('goog-imageless-button-checked')) {
                calendarButton.classList.remove('goog-imageless-button-checked');
                calBox.classList.add('cal-box-inactive');
            } else {
                calendarButton.classList.add('goog-imageless-button-checked');
                calBox.classList.remove('cal-box-inactive');
            }
        });

        calendarButton.addEventListener('mouseenter', function (event) {
            calendarButton.classList.add('goog-imageless-button-hover');
        });

        calendarButton.addEventListener('mouseleave', function (event) {
            calendarButton.classList.remove('goog-imageless-button-hover');
        });
    }
}

var addButtonInterval = setInterval(setUpCalendarButton, 50);
document.addEventListener('click', function(event) {
    var calendarChooser = document.getElementById('cal-box');
    var calendarButton = document.getElementsByClassName('calendar-button')[0];
    if (!calendarChooser.classList.contains('cal-box-inactive')
        && !calendarChooser.contains(event.target)
        && !calendarButton.contains(event.target)) {

            calendarChooser.classList.add('cal-box-inactive');
            calendarButton.classList.remove('goog-imageless-button-checked');
    }
});