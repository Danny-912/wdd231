/* ============================================
   Daniella Odiase . WDD231
   COURSE HOMEPAGE JAVASCRIPT
   ============================================
   Features:
   - Responsive menu toggle
   - Dynamic copyright year
   - Dynamic last modified date
   - Dynamic course list with filtering
   ============================================ */

// =========================
// Responsive Navigation Menu
// =========================
const hamButton = document.querySelector('#menu');
const navMenu = document.querySelector('.nav-links');

hamButton.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamButton.classList.toggle('open');
});

// =========================
// Footer Date & Copyright
// =========================
const yearSpan = document.getElementById('currentYear');
const lastModifiedSpan = document.getElementById('lastModified');

// current year
const today = new Date();
yearSpan.textContent = today.getFullYear();

// last modified date
lastModifiedSpan.textContent = document.lastModified;

// =========================
// Course Data
// =========================
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD231", name: "Frontend Web Development I", credits: 3, type: "WDD", completed: false },
  { code: "CSE110", name: "Introduction to Programming", credits: 2, type: "CSE", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
  { code: "CSE210", name: "Programming with Classes", credits: 2, type: "CSE", completed: false }
];

// =========================
// Course Display Function
// =========================
const courseContainer = document.querySelector('#courseContainer');
const totalCredits = document.querySelector('#totalCredits');

function displayCourses(filteredCourses) {
  courseContainer.innerHTML = ""; // clear
  let total = 0;

  filteredCourses.forEach(course => {
    // create course card
    const div = document.createElement('div');
    div.classList.add('course-box');

    // mark completed ones differently
    if (course.completed) {
      div.classList.add('completed');
    }

    div.innerHTML = `
      <h4>${course.code}</h4>
      <p>${course.name}</p>
      <p><strong>${course.credits} credits</strong></p>
    `;

    total += course.credits;
    courseContainer.appendChild(div);
  });

  // update total credits
  totalCredits.textContent = `Total credits for displayed courses: ${total}`;
}

// =========================
// Filter Buttons
// =========================
const allBtn = document.querySelector('#allBtn');
const wddBtn = document.querySelector('#wddBtn');
const cseBtn = document.querySelector('#cseBtn');

allBtn.addEventListener('click', () => {
  displayCourses(courses);
  setActiveButton(allBtn);
});
wddBtn.addEventListener('click', () => {
  const wddCourses = courses.filter(course => course.type === "WDD");
  displayCourses(wddCourses);
  setActiveButton(wddBtn);
});
cseBtn.addEventListener('click', () => {
  const cseCourses = courses.filter(course => course.type === "CSE");
  displayCourses(cseCourses);
  setActiveButton(cseBtn);
});

// helper to highlight active button
function setActiveButton(button) {
  document.querySelectorAll('.course-tabs button').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
}

// =========================
// Initialize Page
// =========================
displayCourses(courses);
setActiveButton(allBtn);
