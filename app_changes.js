
function addHoverListeners(hoverElement, hoverClass) {
    hoverElement.addEventListener('mouseenter', function() {
        hoverElement.classList.add(hoverClass);
    });

    hoverElement.addEventListener('mouseleave', function() {
        hoverElement.classList.remove(hoverClass);
    })
}

function setUpCalendarButton() {
    var buttonStrip = document.getElementsByClassName('button-strip')[0];

    if (buttonStrip) {
        // Stop the interval if we're able to get ahold of the button strip element
        // B/c the Google async js has finished loading the calendar DOM
        clearInterval(addButtonInterval);

        // The Google calendar chooser elements that we're moving to the drop down box
        var calendarChooser = document.getElementById('lhscalinner_my');
        var othersCalendarChooser = document.getElementById('calendars_fav');

        // Creating the new event button
        var newButtonTemplate = document.createElement('template');
        newButtonTemplate.innerHTML = '<div class="goog-inline-block goog-imageless-button new-button" role="button" aria-expanded="false" tabindex="0" aria-haspopup="true" id="new-button" style="-webkit-user-select: none;"><div class="goog-inline-block goog-imageless-button-outer-box"><div class="goog-inline-block">New</div></div></div>';
        var newButton = newButtonTemplate.content.firstChild;
        buttonStrip.appendChild(newButton);

        newButton.addEventListener('click', function() {
            document.querySelector('#createEventButtonContainer').firstChild.firstChild.click()
        });

        // Creating the calendar chooser button
        var calButtonTemplate = document.createElement('template');
        calButtonTemplate.innerHTML = '<div class="goog-inline-block goog-imageless-button calendar-button" role="button" aria-expanded="false" tabindex="0"aria-haspopup="true" id="mg-more" style="-webkit-user-select: none;"><div class="goog-inline-block goog-imageless-button-outer-box"><div class="goog-inline-block">Options</div><div class="goog-inline-block more-arrow"></div></div></div>';
        var calendarButton = calButtonTemplate.content.firstChild;
        buttonStrip.appendChild(calendarButton);

        // Creating the drop-down box for the calendar selectors
        var calBoxTemplate = document.createElement('template');
        calBoxTemplate.innerHTML = '<div id="cal-box" class="goog-menu goog-menu-vertical" role="menu" aria-haspopup="true" style="-webkit-user-select: none; margin: 20px; width: 400px; visibility: visible; " aria-activedescendant=":h"></div>';
        var calBox = calBoxTemplate.content.firstChild;

        calBox.className += ' cal-box cal-box-inactive';

        calendarChooser.classList.add('cal-chooser');
        othersCalendarChooser.classList.add('cal-chooser');


        var calHeaderTemplate = document.createElement('template');
        calHeaderTemplate.innerHTML = '<div class="goog-menuheader goog-menuheader-disabled" aria-disabled="true" id="cal-header" style="user-select: none;">Your calendars:</div>';
        var calHeader = calHeaderTemplate.content.firstChild;
        calBox.appendChild(calHeader);

        calBox.appendChild(calendarChooser);
        calBox.appendChild(othersCalendarChooser);

        var body = document.getElementsByTagName('body')[0];
        body.appendChild(calBox);

        // Making the calendar dropdown appear when button is clicked
        calendarButton.addEventListener('click', function (event) {
            if (calendarButton.classList.contains('goog-imageless-button-checked')) {
                calendarButton.classList.remove('goog-imageless-button-checked');
                calBox.classList.add('cal-box-inactive');
            } else {

                calBox.style.right = window.innerWidth - calendarButton.getBoundingClientRect().right - 23 + 'px';
                // console.log(window.width);
                // console.log(calendarButton.getBoundingClientRect());
                // console.log(calendarButton.getBoundingClientRect().right);
                calendarButton.classList.add('goog-imageless-button-checked');
                calBox.classList.remove('cal-box-inactive');
            }
        });


        // Making a separator to add to the new option box
        var separatorTemplate = document.createElement('template');
        separatorTemplate.innerHTML = '<div class="goog-menuseparator" aria-disabled="true" role="separator" id=":k" style="user-select: none;"></div>';
        var separator = separatorTemplate.content.firstChild;
        calBox.appendChild(separator);

        // Making the print button to add to the box
        var printButtonTemplate = document.createElement('template');
        printButtonTemplate.innerHTML = '<div class="goog-menuitem" role="menuitem" id="printButton" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Print</div></div>';
        var printButton = printButtonTemplate.content.firstChild;

        printButton.addEventListener('click', function() {
            calendarButton.classList.remove('goog-imageless-button-checked');
            calBox.classList.add('cal-box-inactive');
            window.print();
        });

        calBox.appendChild(printButton);

        // Making the sign-out button
        var signOutTemplate = document.createElement('template');
        signOutTemplate.innerHTML = '<div class="goog-menuitem" role="menuitem" id="printButton" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Sign out</div></div>';
        var signOutButton = signOutTemplate.content.firstChild;

        signOutButton.addEventListener('click', function() {
            document.querySelector('#gb_71').click();
        });

        calBox.appendChild(signOutButton);



        addHoverListeners(calendarButton, 'goog-imageless-button-hover');
        addHoverListeners(newButton, 'goog-imageless-button-hover');
        addHoverListeners(printButton, 'button-hovered');
        addHoverListeners(signOutButton, 'button-hovered');

        // Accommodating for users with two time zones on their calendars
        if (document.querySelector('.tg-timesnotlast')) {
            document.querySelector('#topcontainerwk').style.paddingLeft = '117px';
        }

        // Adding event listeners for arrow hotkeys
        function keyPressed(event) {
            if (event.key === 'ArrowRight') {
                document.querySelector('.navForward').click();
            }
            if (event.key == 'ArrowLeft') {
                document.querySelector('.navBack').click();
            }
            console.log(event);
        }

        window.addEventListener('keydown', keyPressed, false);

    }
}

var addButtonInterval = setInterval(setUpCalendarButton, 100);


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