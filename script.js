// script.js

function scheduleEvent() {
    const eventDescription = document.getElementById('eventDescription').value;
    const CLIENT_ID = '1040562803503-n9jcch6abv6q9f0c3ue395037f1f3qj6.apps.googleusercontent.com';

    gapi.load('client:auth2', initClient);

    function initClient() {
        gapi.client.init({
            apiKey: CLIENT_ID,
            clientId: CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar',
        }).then(() => {
            createEvent(eventDescription);
        }).catch(err => {
            console.error('Error initializing Google API client:', err);
        });
    }

    function createEvent(description) {
        const startDateTime = new Date();
        const endDateTime = new Date();
        endDateTime.setHours(endDateTime.getHours() + 1); // Assuming 1-hour event duration

        const event = {
            'summary': description,
            'description': description,
            'start': {'dateTime': startDateTime.toISOString()},
            'end': {'dateTime': endDateTime.toISOString()},
        };

        gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
        }).then(response => {
            console.log('Event created:', response.result);
            // Provide user feedback if needed
        }).catch(err => {
            console.error('Error creating event:', err);
            // Handle error and provide user feedback
        });
    }
}
