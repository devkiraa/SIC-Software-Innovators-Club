document.addEventListener('DOMContentLoaded', () => {
    const upcomingEventsContainer = document.getElementById('upcoming-events-container');
    const liveEventsContainer = document.getElementById('live-events-container');
    const eventsUrl = 'https://raw.githubusercontent.com/sicasaskochi/SIC-Events/main/events.json';

    fetch(eventsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Populate Upcoming Events
            if (data.upcomingEvents && data.upcomingEvents.length > 0) {
                upcomingEventsContainer.innerHTML = ''; // Clear existing content
                data.upcomingEvents.forEach(event => {
                    const eventCard = createEventCard(event);
                    upcomingEventsContainer.innerHTML += eventCard;
                });
            } else {
                upcomingEventsContainer.innerHTML = '<p>No upcoming events at the moment. Stay tuned!</p>';
            }

            // Populate Live Events
            if (data.liveEvents && data.liveEvents.length > 0) {
                liveEventsContainer.innerHTML = ''; // Clear existing content
                data.liveEvents.forEach(event => {
                    const eventCard = createEventCard(event);
                    liveEventsContainer.innerHTML += eventCard;
                });
            } else {
                liveEventsContainer.innerHTML = '<p>No live events right now.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            upcomingEventsContainer.innerHTML = '<p>Could not load upcoming events. Please try again later.</p>';
            liveEventsContainer.innerHTML = '<p>Could not load live events. Please try again later.</p>';
        });

    function createEventCard(event) {
        return `
            <div class="col">
                <div class="card mb-4 mb-xl-0 card-hover border">
                    <a href="#!">
                        <img src="${event.image}" alt="${event.title}" class="img-fluid w-100 rounded-top-3">
                    </a>
                    <div class="card-body">
                        <h3 class="mb-4 text-truncate">
                            <a href="#!" class="text-inherit">${event.title}</a>
                        </h3>
                        <div class="mb-4">
                            <div class="mb-3 lh-1">
                                <span class="me-1"><i class="bi bi-calendar-check"></i></span>
                                <span>${event.date}</span>
                            </div>
                            <div class="lh-1">
                                <span class="align-text-top me-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                    </svg>
                                </span>
                                <span>${event.time}</span>
                            </div>
                        </div>
                        <a href="${event.registerLink}" target="_blank" class="btn btn-light-primary text-primary">Register Now</a>
                    </div>
                </div>
            </div>
        `;
    }
});