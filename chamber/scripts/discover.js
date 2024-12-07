const msToDays = 86400000; // Milliseconds in a day
const todayElement = document.getElementById("modal-title");

const dialog = document.querySelector("dialog");

const closeButton = document.getElementById("close-modal");
dialog.showModal();

closeButton.addEventListener("click", () => {
    dialog.close("close");
    openCheck(dialog);
});


function modalGreeting() {
    const currentDate = Date.now();

    if (localStorage.getItem("Today")) {
        // Retrieve last visit
        const lastVisit = parseInt(localStorage.getItem("Today"), 10);
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / msToDays);

        // Verify how many days have passed
        if (daysSinceLastVisit === 0) {
            todayElement.innerHTML = `<p>Back so soon! Awesome!</p>`;
        } else if (daysSinceLastVisit === 1) {
            todayElement.innerHTML = `<p>You were here yesterday! Welcome back!</p>`;
        } else {
            todayElement.innerHTML = `<p>You last visited ${daysSinceLastVisit} days ago.</p>`;
        }
    } else {
        // First Visit
        todayElement.innerHTML = `<p>Welcome! Let us know if you have any questions.</p>`;
    }

    // Save Current Date
    localStorage.setItem("Today", currentDate);
}

modalGreeting();


