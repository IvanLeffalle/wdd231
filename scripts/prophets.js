const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
console.log("Código se está ejecutando");
const all = document.querySelector("#all");
const tenOrMoreChildren = document.querySelector("#morechildren"); 
const old = document.querySelector("#old");
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    cards.innerHTML = ''; 

    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthdate = document.createElement('p');
        let placeOfBirth = document.createElement('p');
        let age = document.createElement('p');
        let numofchildren = document.createElement('p');

        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
        age.textContent = `Age: ${getAgeAtDeathInYears(prophet.birthdate, prophet.death)}`;
        numofchildren.textContent = `Children: ${prophet.numofchildren}`;

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '250');
        portrait.setAttribute('height', '250');

        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(placeOfBirth);
        card.appendChild(age);
        card.appendChild(numofchildren);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
};

const getProphetData = async (filter = "all") => {
    let prophets = await jsonFetch(url);

    switch (filter) {
        case "old":
            prophets = prophets.filter(
                (prophet) => getAgeAtDeathInYears(prophet.birthdate, prophet.death) >= 95
            );
            break;
        case "10+children":
            prophets = prophets.filter(
                (prophet) => prophet.numofchildren > 10
            );
            break;
        default:
            break;
    }

    displayProphets(prophets);
};

async function jsonFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.prophets;
}

getProphetData(); 

function getAgeAtDeathInYears(birthdate, deathdate) {
    let birth = new Date(birthdate);
    let death = new Date(deathdate);
    if (isNaN(death)) {  
        death = new Date();
    }
    return Math.floor((death - birth) / (365 * 24 * 60 * 60 * 1000));
}

function clearButtonClasses() {
    all.classList.remove("active");
    tenOrMoreChildren.classList.remove("active"); 
    old.classList.remove("active");
}

all.addEventListener("click", () => {
    clearButtonClasses();
    getProphetData("all");
    all.classList.add("active");
});

tenOrMoreChildren.addEventListener("click", () => {
    clearButtonClasses();
    getProphetData("10+children"); 
    tenOrMoreChildren.classList.add("active");
});

old.addEventListener("click", () => {
    clearButtonClasses();
    getProphetData("old");
    old.classList.add("active");
});
