const events = "./data/events.json";

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
const dotsContainer = document.querySelector(".dots"); // Container for dots
let currentIndex = 0;

const displaySlider = (events) => {
    if (!eventsSlider) return;
    eventsSlider.innerHTML = '';
    dotsContainer.innerHTML = ''; // Clear dots on new render

    events.forEach((item, index) => {
        let slide = document.createElement('section');
        let eventTitle = document.createElement('h2');
        let eventDate = document.createElement('p');
        let eventTime = document.createElement('p');
        let image = document.createElement('img');
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

        eventDate.classList.add('date');
        eventTime.classList.add('time');
        eventTitle.classList.add('title');

        slide.appendChild(eventTitle);
        slide.appendChild(image);
        slide.appendChild(eventDescription);
        slide.appendChild(eventDate);
        slide.appendChild(eventTime);

        slide.classList.add('slide');
        if (index !== 0) slide.style.display = 'none';

        eventsSlider.appendChild(slide);

        // Create dots
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // Highlight active dot
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex, events);
            updateDots();
        });
        dotsContainer.appendChild(dot);
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
        updateDots();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % events.length;
        showSlide(currentIndex, events);
        updateDots();
    });
};

// Update the active dot
const updateDots = () => {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
};

fetchEventJSON(events).then(data => {
    if (data) {
        displaySlider(data);
        setupNavigation(data);
    }
});
