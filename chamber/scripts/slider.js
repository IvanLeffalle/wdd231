const events = "./data/events.json"

async function fetchEventJSON(events) {
    try {
        const response = await fetch(events);
        const eventsData = await response.json();
        return eventsData.events;
    } catch (error) {
        console.log(`Error fetching data from ${events}:`, error);
        return null;
    }
}

const eventsSlider = document.querySelector(".slides");
let currentIndex = 0;

const displaySlider = (events) => {
    if (!eventsSlider) return;
    eventsSlider.innerHTML = '';

    events.forEach((item, index) => {
        let slide = document.createElement('section');
        let eventTitle = document.createElement('h2');
        let eventDate = document.createElement('p');
        let eventTime = document.createElement('p');
        let image = document.createElement('img')
        let eventDescription = document.createElement('p');

        image.setAttribute('src', item.image);
        image.setAttribute('alt', `Portrait of ${item.title}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '400');
        image.setAttribute('height', 'auto');

        eventTitle.textContent = item.title;
        eventDate.textContent = item.date;
        eventTime.textContent = item.time;
        eventDescription.textContent = item.desc;

        slide.appendChild(eventTitle);
        slide.appendChild(image);
        slide.appendChild(eventDescription);
        slide.appendChild(eventDate);
        slide.appendChild(eventTime);

        slide.classList.add('slide');
        if (index !== 0) slide.style.display = 'none';

        eventsSlider.appendChild(slide);
    });
};

const showSlide = (index, events) => {
    const slides = document.querySelectorAll('.slides section');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
};

const setupNavigation = (events) => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + events.length) % events.length;
        showSlide(currentIndex, events);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % events.length;
        showSlide(currentIndex, events);
    });
};

fetchEventJSON(events).then(data => {
    if (data) {
        displaySlider(data);
        setupNavigation(data);
    }
});
