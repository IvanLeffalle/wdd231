
/*Responsive Menu*/
const menu = document.querySelector("#menu");
const list = document.querySelector(".list");

menu.addEventListener("click", () => {
    list.classList.toggle("active");
    menu.classList.toggle("active");
});

const buttons = document.querySelectorAll('.buttons');
const activePage = localStorage.getItem('activePage');

buttons.forEach(btn => {
    btn.addEventListener('click', function (event) {
        buttons.forEach(button => button.classList.remove('new-active'));
        this.classList.add('new-active');
        localStorage.setItem('activePage', this.href);
    });
});

if (activePage) {
    const activeBtn = [...buttons].find(btn => btn.href === activePage);
    if (activeBtn) {
        activeBtn.classList.add('new-active');
    }
}


