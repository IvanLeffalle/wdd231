const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const isCompleted = (course) => {
    const completedClass = course.completed ? 'completed' : 'not-completed';
    return `<li class="course ${completedClass}" id="show-modal"><a>${course.subject} ${course.number}</a></li>`;
}
const filterCourses = (subject) => {
    const filteredCourses = subject === 'ALL' ? courses : courses.filter((course) => course.subject === subject);
    const courseHTML = filteredCourses.map(isCompleted).join("");
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    document.querySelector("#total-credits").innerHTML = `Number of Credits: ${totalCredits}`;
    document.querySelector("#courses").innerHTML = courseHTML;
}
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const subject = event.target.getAttribute("data-subject");
        filterCourses(subject);
    });
});

filterCourses('ALL');




/*Footer*/
const year = new Date().getFullYear();
document.querySelector("#year").innerHTML = year;
const lastModified = document.lastModified;
document.querySelector("#last-modified").innerHTML = lastModified;

/*Responsive Menu*/
const menu = document.querySelector("#menu");
const list = document.querySelector(".list");

menu.addEventListener("click", () => {
    list.classList.toggle("active");
    menu.classList.toggle("active");
});

/*Active Buttons */
const btns = document.querySelectorAll('.btn');

const activePage = localStorage.getItem('activePage');

btns.forEach(btn => {
    btn.addEventListener('click', function (event) {
        btns.forEach(button => button.classList.remove('active'));
        this.classList.add('active');
        localStorage.setItem('activePage', this.href);
    });
});

if (activePage) {
    const activeBtn = [...btns].find(btn => btn.href === activePage);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}



function displayModalCourses(course) {
    const dialog = document.querySelector('dialog');
    const courseDetails = document.querySelector("#course-details");

   
    courseDetails.innerHTML = `
        <button id="close-modal">X</button>
        <h2 >${course.subject} ${course.number}</h2>
        <p>${course.description}</p>
        <ul>
            <li><span class="li-element">Subject:</span> ${course.subject}</li>
            <li><span class="li-element">Number:</span> ${course.number}</li>
            <li><span class="li-element">Title:</span> ${course.title}</li>
            <li><span class="li-element">Credits:</span> ${course.credits}</li>
            <li><span class="li-element">Certificate:</span> ${course.certificate}</li>
            <li><span class="li-element">Description:</span> ${course.description}</li>
            <li><span class="li-element">Technology:</span> ${course.technology.join(', ')}</li>
            <li><span class="li-element">Completed:</span> ${course.completed ? 'Yes' : 'No'}</li>
        </ul>`;

    dialog.showModal();

    // Cerrar el modal
    const closeButton = document.querySelector("#close-modal");
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
}

document.querySelector("#courses").addEventListener("click", (event) => {
    const target = event.target.closest("li");
    if (target && target.classList.contains("course")) {
        const courseNumber = parseInt(target.textContent.split(" ")[1], 10);
        const selectedCourse = courses.find(course => course.number === courseNumber);
        if (selectedCourse) {
            displayModalCourses(selectedCourse);
        }
    }
});