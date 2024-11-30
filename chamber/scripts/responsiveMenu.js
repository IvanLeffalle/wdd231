
/*Responsive Menu*/
const menu = document.querySelector("#menu");
const list = document.querySelector(".list");

//select menu buttons
const home = document.querySelector('a[href="index.html"]');
const directory = document.querySelector('a[href="directory.html"]');
const join = document.querySelector('a[href="join.html"]');
const contact = document.querySelector('a[href="contact.html"]');


menu.addEventListener("click", () => {
    list.classList.toggle("active");
    menu.classList.toggle("active");
});

//
//active class

document.addEventListener('DOMContentLoaded', function () {
    pageTitle = document.querySelector('title').innerText;
    changeActive(pageTitle);
}, false)


function changeActive(activeMode) {
    home.classList.remove('new-active');
    directory.classList.remove('new-active');
    join.classList.remove('new-active');
    contact.classList.remove('new-active');
    switch (activeMode) {
        case 'Chamber of Dentists Home Page':
            home.classList.add('new-active');
            break;
        case 'Chamber of Dentists Directory Page':
            directory.classList.add('new-active');
            break;
        case 'Chamber of Dentists Join Page':
            join.classList.add('new-active');
            break;
        case 'contact':
            contact.classList.add('new-active');
            break;
    }

}

