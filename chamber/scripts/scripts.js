document.querySelector('.modification').textContent = new Date(document.lastModified).toLocaleDateString();

const url = "./data/members.json";


async function jsonFetch(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.log("Error fetching members data:", error);
        business.innerHTML = "<p>Error loading members data.</p>";
    }
}

const business = document.querySelector('#business');
const cards = document.querySelector('#cards');
const displayMemberHome = (members) => {
    business.innerHTML = '';

    const getRandomMembers = (arr, count) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    const selectedMembers = getRandomMembers(members, 3);
    selectedMembers.forEach(member => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('p');
        let image = document.createElement('img');
        let membership = document.createElement('p');

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        membership.textContent = `${member.membership} Member`;

        let websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        websiteLink.target = "_blank";
        website.appendChild(websiteLink);

        image.setAttribute('src', member.image);
        image.setAttribute('alt', `Portrait of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '200');
        image.setAttribute('height', 'auto');

        card.appendChild(name);
        card.appendChild(membership);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        business.appendChild(card);
    });
};

const displayMember = (members) => {
    cards.innerHTML = '';

    if (cards.classList.contains('list-view')) {
        createTableView(members);
    } else {
        createGridView(members);
    }
};

const createTableView = (members) => {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');

    ['Name', 'Address', 'Phone', 'Website', 'Membership'].forEach(text => {
        let th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');

    members.forEach(member => {
        let row = document.createElement('tr');

        row.appendChild(createCell(member.name));
        row.appendChild(createCell(member.address));
        row.appendChild(createCell(member.phone));

        let websiteCell = document.createElement('td');
        let websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        websiteLink.target = "_blank";
        websiteCell.appendChild(websiteLink);
        row.appendChild(websiteCell);

        row.appendChild(createCell(member.membership));

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    cards.appendChild(table);
};

const createGridView = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('p');
        let image = document.createElement('img');
        let membership = document.createElement('p');

        name.textContent = member.name;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        membership.textContent = `Membership: ${member.membership}`;

        let websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        websiteLink.target = "_blank";
        website.appendChild(websiteLink);

        image.setAttribute('src', member.image);
        image.setAttribute('alt', `Image of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '250');
        image.setAttribute('height', '250');

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        cards.appendChild(card);
    });
};

const createCell = (text) => {
    let cell = document.createElement('td');
    cell.textContent = text;
    return cell;
};
jsonFetch(url).then(displayMemberHome);


// Toggle view buttons
const btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

document.getElementById('grid-toggle').addEventListener('click', () => {
    cards.classList.add('grid-view');
    cards.classList.remove('list-view');
    jsonFetch(url).then(displayMember);
});

document.getElementById('list-toggle').addEventListener('click', () => {
    cards.classList.add('list-view');
    cards.classList.remove('grid-view');
    jsonFetch(url).then(displayMember);
});


const inputs = document.querySelectorAll("input, select, textarea");

inputs.forEach(input => {
    input.addEventListener("invalid", () => {
        input.style.borderColor = "red";
    });

    input.addEventListener("input", () => {
        input.style.borderColor = "";
    });
});






jsonFetch(url).then(displayMember);



