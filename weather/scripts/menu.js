/*Responsive Menu*/
const menu = document.querySelector("#menu");
const list = document.querySelector(".list");

const home = document.querySelector('a[href="index.html"]');
const contact = document.querySelector('a[href="contact.html"]');
const about = document.querySelector('a[href="about.html"]');

menu.addEventListener("click", () => {
    list.classList.toggle("active");
    menu.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', function () {
    pageTitle = document.querySelector('title').innerText;
    changeActive(pageTitle);
}, false)


function changeActive(activeMode) {
    home.classList.remove('new-active');
    contact.classList.remove('new-active');
    about.classList.remove('new-active');
    switch (activeMode) {
        case 'Weather App Home Page':
            home.classList.add('new-active');
            break;
        case 'Weather App Contact Page':
            contact.classList.add('new-active');
            break;
        case 'Weather App About Page':
            about.classList.add('new-active');
            break;
    }
}