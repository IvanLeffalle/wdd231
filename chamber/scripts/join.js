// Modal Logic

const membershipDialog = document.querySelector("#membership-modal");
const silverBtn = document.querySelector("#silver-btn");
const goldBtn = document.querySelector("#gold-btn");
const bronzeBtn = document.querySelector("#bronze-btn");
const freeBtn = document.querySelector("#free-btn");

function openMembershipModal(membership) {
    membershipDialog.innerHTML = '';

    const closeModal = document.createElement('button');
    closeModal.textContent = '❌';
    closeModal.classList.add('close-modal');
    closeModal.addEventListener('click', () => {
        membershipDialog.close();
    });
    membershipDialog.appendChild(closeModal);

    // Create Modal Content
    const membershipTitle = document.createElement('h2');
    const membershipDescription = document.createElement('p');
    const membershipBenefits = document.createElement('ul');

    switch (membership) {
        case 'Free':
            membershipTitle.textContent = 'Free Membership';
            membershipDescription.textContent =
                'Join the Free Membership and enjoy access to exclusive events and benefits.';
            membershipBenefits.innerHTML = `
                <li>No Listing</li>
                <li>No Discounts</li>
                <li>No Business Reviews</li>
            `;
            break;
        case 'Gold':
            membershipTitle.textContent = 'Gold Membership';
            membershipDescription.textContent =
                'Join the Gold Membership and enjoy access to exclusive events and benefits.';
            membershipBenefits.innerHTML = `
                <li>Access to all events</li>
                <li>Free Listing</li>
                <li>30% Discount</li>
                <li>Unlimited Business Reviews</li>
            `;
            break;
        case 'Bronze':
            membershipTitle.textContent = 'Bronze Membership';
            membershipDescription.textContent =
                'Join the Bronze Membership and enjoy access to exclusive events and benefits.';
            membershipBenefits.innerHTML = `
                <li>Free Listing</li>
                <li>10% Discount</li>
                <li>5 Business Reviews</li>
            `;
            break;
        case 'Silver':
            membershipTitle.textContent = 'Silver Membership';
            membershipDescription.textContent =
                'Join the Silver Membership and enjoy access to exclusive events and benefits.';
            membershipBenefits.innerHTML = `
                <li>Free Listing</li>
                <li>20% Discount</li>
                <li>10 Business Reviews</li>
            `;
            break;
        default:
            membershipTitle.textContent = 'Membership Selection';
            membershipDescription.textContent = 'Please select a membership plan.';
            break;
    }

    // append content to the modal
    membershipDialog.appendChild(membershipTitle);
    membershipDialog.appendChild(membershipDescription);
    membershipDialog.appendChild(membershipBenefits);

    membershipDialog.showModal();
}


//application form
document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.getElementById("timestamp");
    const currentDate = new Date();
    timestampInput.value = currentDate.toISOString();

});

const currentUrl = window.location.href;
const everything = currentUrl.split('?');
console.log(everything);
let formData = everything[1]?.split('&') || [];
console.log(formData);


function show(cup) {
    let result = '';
    formData.forEach(element => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace("%40", "@").split('%');
        }
    });
    return result;
}


const showInfo = document.querySelector('#results');
if (showInfo) {
    showInfo.innerHTML = `
        <h3>Thank you ${show('first-name')} for your interest in registering with ${show("business-name")}.</h3>
        <p>Here is your information:</p>
        <p><span>Name:</span> ${show('first-name')} ${show('last-name')}</p>
        <p><span>Email</span>: ${show('email')}</p>
        <p><span>Phone Number:</span> ${show('phone')}</p>
        <p><span>Membership:</span> ${show('membership')}</p>
        <p><span>Date:</span> ${show('timestamp')}</p>
    `;
}

// Event Listeners
freeBtn.addEventListener('click', () => openMembershipModal('Free'));
bronzeBtn.addEventListener('click', () => openMembershipModal('Bronze'));
goldBtn.addEventListener('click', () => openMembershipModal('Gold'));
silverBtn.addEventListener('click', () => openMembershipModal('Silver'));
