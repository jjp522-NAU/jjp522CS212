// Verify JS connection
console.log("Hello World!");

// Define variables
const name = "Jake Preston"; 
let hasDownloadedResume = false;

// Greeting Function
function showGreeting(name) {
  return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

// Greeting that changes by time of day
function getTimeBasedGreeting(name) {
  const hour = new Date().getHours();
  let timeGreeting;

  if (hour < 12) {
    timeGreeting = "Good Morning";
  } else if (hour < 18) {
    timeGreeting = "Good Afternoon";
  } else {
    timeGreeting = "Good Evening";
  }

  return `${timeGreeting}, my name is ${name}! Welcome to my portfolio!`;
}

// Display greeting on page load
window.onload = function () {
    //get html element
  const greetingElement = document.getElementById("greeting");
  // Display message
  greetingElement.textContent = getTimeBasedGreeting(name);
};

// Show alert when Resume is downloaded
const downloadButton = document.getElementById("downloadBtn");

downloadButton.addEventListener("click", function () {
  if (!hasDownloadedResume) {
    hasDownloadedResume = true;

    // delay the alert by 2 seconds
    setTimeout(() => {
      alert("Your resume is downloaded successfully!");
    }, 2000);
  } else {
    console.log("Resume already downloaded — alert will not show again.");
  }
});

//Date Calculation
function daysUntilDeadline(deadlineDate) {
  const currentDate = new Date();
  const deadline = new Date(deadlineDate);

  const differenceInTime = deadline.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}

// project deadline 
const deadlineMessage = document.getElementById("deadline");
const remainingDays = daysUntilDeadline("2025-12-31");
deadlineMessage.textContent = `Deadline: December 31, 2025 (${remainingDays} days remaining)`;
console.log(`Days until project deadline: ${remainingDays}`);


//old section^^^
//new section


//SKILL ADDING SECTION
const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillCategory = document.getElementById("skillCategory");

/*
addSkillBtn.addEventListener("click", function () {
  const newSkill = skillInput.value.trim();
  const category = skillCategory.value;

  if (newSkill === "") {
    alert("Please enter a skill first.");
    return;
  }

  // Find all skill cards
  const cards = document.querySelectorAll("#skills .card");

  let listSelector = null;

  cards.forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    if (
      (category === "design" && title.includes("design")) ||
      (category === "programming" && title.includes("programming")) ||
      (category === "soft" && title.includes("soft"))
    ) {
      listSelector = card.querySelector("ul");
    }
  });

  // Add the skill if we found the correct list
  if (listSelector) {
    const li = document.createElement("li");
    li.textContent = newSkill;
    listSelector.appendChild(li);
  }

  // Clear input
  skillInput.value = "";
});
*/

//RESUME DOWNLOAD BUTTON
const downloadCountDisplay = document.getElementById("downloadCount");

let downloadCount = 0; // variable to track total downloads

function updateDownloadDisplay() {
  downloadCountDisplay.textContent = `Resume downloaded ${downloadCount} time${downloadCount !== 1 ? "s" : ""}.`;
}

// Initial display
updateDownloadDisplay();

downloadButton.addEventListener("click", function () {
  downloadCount++; // increment count each click
  updateDownloadDisplay(); // update the text
});

// Arrays holding project data
const projectTitles = [
  "The Milgram Experiment",
  "Gunslinger Breakout",
  "Grand Prix",
  "Time Shift",
  "Spacial Defense"
];

const projectDescriptions = [
  "The Milgram Experiment pushes the boundaries on what a game can be. It puts the player through the famous Milgram Experiment and tests how they would react in the face of pleading and helpless citizens. Players take the role of a Patriot Test administratorin a fictional country, deciding whether to obey authority or rebel and save lives.",
  "Gunslinger Breakout is an unfinished 3D FPS puzzle game where the player must use a revolver full of bullets with special abilities to solve puzzles and escape an abandoned facility filled with challenges.",
  "Grand Prix is a fast-paced strategic card game where players strike at the perfect moment to secure victory. Compete in consecutive 1v1 races while managing and spending resources strategically to win.",
  "Time Shift is a 3D first-person puzzle game where players travel through time to solve puzzles and escape a high-security facility. Created as part of a group project at UC Irvine, players switch between present and future timelines to progress.",
  "Spacial Defense is a 2.5D Tower Defense game where the player must manage and reposition three towers with unique abilities to stop waves of enemies. Players can upgrade towers after reaching score milestones to enhance their defense."
];

const projectDeadlines = [
  "2025-12-31", // Milgram Experiment
  "2025-11-15", // Gunslinger Breakout
  "2026-1-26",  // Grand Prix
  "2024-10-22", //Time Shift
  "2023-7-23" //spacial defense
];

//PROJCECT ARRAY SECTION
// Get the container in HTML
const projectContainer = document.getElementById("projectContainer");

//New Project Sorting Section
$("#projects").prepend(`
  <div class="text-center mb-3">
    <button id="sortAsc" class="btn btn-primary btn-sm me-2">Sort by Earliest Deadline</button>
    <button id="sortDesc" class="btn btn-secondary btn-sm">Sort by Latest Deadline</button>
  </div>
`);


function parseDate(dateString) {
  const parts = dateString.split("-");
  //month index is zero-based
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

//Helper to compute days remaining
function daysRemaining(deadline) {
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function renderProjects(projects) {
  $("#projectContainer").empty();
  const currentDate = new Date();

  projects.forEach(p => {
    //Determine status text, color, and extra info
    let statusText = "";
    let statusColor = "";
    let extraInfo = "";

    if (p.deadline > currentDate) {
      const daysLeft = daysRemaining(p.deadline);
      statusText = "Ongoing";
      statusColor = "#00ff7f"; 
      extraInfo = ` (${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining)`;
    } else if (p.deadline < currentDate) {
      statusText = "Completed";
      statusColor = "#877affff"; 
    } else if (p.deadline.toDateString() === currentDate.toDateString()) {
      statusText = "Due Today";
      statusColor = "#ffcc00"; 
    }

    //Make the card
    const card = `
      <div class="col-md-6 col-lg-4">
        <div class="card bg-dark border border-primary h-100">
          <div class="card-body">
            <h5 class="card-title text-primary">${p.title}</h5>
            <p class="card-text small">${p.description}</p>
            <p class="text-info small mt-2">Deadline: ${p.deadline.toDateString()}</p>
            <p class="fw-bold" style="color: ${statusColor};">
              Status: ${statusText}${extraInfo}
            </p>
          </div>
        </div>
      </div>
    `;

    $("#projectContainer").append($(card).hide().fadeIn(400));
  });
}

//Build the project objects
const projects = projectTitles.map((title, i) => ({
  title,
  description: projectDescriptions[i],
  deadline: parseDate(projectDeadlines[i])
}));

//render, start sorted
projects.sort((a, b) => b.deadline - a.deadline);
renderProjects(projects);

//Sort buttons so it works
$("#sortAsc").click(() => {
  projects.sort((a, b) => a.deadline - b.deadline);
  renderProjects(projects);
});

$("#sortDesc").click(() => {
  projects.sort((a, b) => b.deadline - a.deadline);
  renderProjects(projects);
});




//NEW EDUCATION SECTION

//Education Array
const educationData = [
  { school: "UC Irvine", degree: "Game Design and Interactive Media", start: "2019", end: "2022" },
  { school: "Northern Arizona University", degree: "Immersive Media and Games", start: "2024", end: "Present" }
];

//Experience Array
const experienceData = [
  { role: "Lead Game Designer", company: "NAU Game Studio", start: "2024", end: "Present" },
  { role: "Systems Designer", company: "IndieDev Collective", start: "2022", end: "2024" },
  { role: "Level Designer Intern", company: "Pixel Forge Studios", start: "2021", end: "2022" }
];

//Create Education Table
function createEducationTable() {
  const container = document.getElementById("educationContainer");

  // Table elements
  const table = document.createElement("table");
  table.classList.add("table", "table-dark", "table-striped", "table-bordered", "align-middle");

  // Header row
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["School / University", "Degree", "Start Date", "End Date"];

  headers.forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    th.classList.add("text-primary");
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body rows
  const tbody = document.createElement("tbody");

  educationData.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.school}</td>
      <td>${item.degree}</td>
      <td>${item.start}</td>
      <td>${item.end}</td>
    `;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

//Create Experience Table
function createExperienceTable() {
  const container = document.getElementById("experienceContainer");

  //Table elements
  const table = document.createElement("table");
  table.classList.add("table", "table-dark", "table-striped", "table-bordered", "align-middle");

  //Header row
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Role / Job Title", "Company / Organization", "Start Date", "End Date"];

  headers.forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    th.classList.add("text-primary");
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  //Body rows
  const tbody = document.createElement("tbody");

  experienceData.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.role}</td>
      <td>${item.company}</td>
      <td>${item.start}</td>
      <td>${item.end}</td>
    `;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

//Generate both tables on page load
createEducationTable();
createExperienceTable();


//Dynamic Skills with JQuery
//Array to store skills
let skillsArray = [];

//Function to render the skills list
function renderSkills() {
  const skillList = $("#dynamicSkillList");
  skillList.empty();

  skillsArray.forEach((skill, index) => {
    const li = $(`
      <li class="d-flex justify-content-between align-items-center mb-2">
        <span class="skill-name">${skill}</span>
        <div>
          <button class="btn btn-sm btn-warning edit-skill" data-index="${index}">Edit</button>
          <button class="btn btn-sm btn-danger delete-skill" data-index="${index}">Delete</button>
        </div>
      </li>
    `).hide().fadeIn(400);
    skillList.append(li);
  });
}

//Create a dynamic list container
if ($("#skills").find("#dynamicSkillList").length === 0) {
  $("#skills").append(`
    <ul id="dynamicSkillList" class="list-unstyled mt-3"></ul>
  `);
}

//Add
$("#addSkillBtn").click(function () {
  const newSkill = $("#skillInput").val().trim();

  if (newSkill === "") {
    alert("Please enter a skill.");
    return;
  }

  //Check if skill already exists
  if (skillsArray.some(skill => skill.toLowerCase() === newSkill.toLowerCase())) {
    alert("Skill already exists!");
    return;
  }

  skillsArray.push(newSkill);
  renderSkills();
  $("#skillInput").val("");
});

//Edit
$(document).on("click", ".edit-skill", function () {
  const index = $(this).data("index");
  const newName = prompt("Edit skill name:", skillsArray[index]);
  if (newName && newName.trim() !== "") {
    skillsArray[index] = newName.trim();
    renderSkills();
  }
});

//Delete
$(document).on("click", ".delete-skill", function () {
  const index = $(this).data("index");
  $(this).closest("li").slideUp(400, function () {
    skillsArray.splice(index, 1);
    renderSkills();
  });
});

// Keyboard Events
$("#skillInput").on("keydown", function (event) {
  if (event.key === "Enter") {
    $("#addSkillBtn").click();
  } else if (event.key === "Escape") {
    $("#skillInput").val("");
  }
});


//Dynamic Nav Menu
const navItems = ["About Me", "Skills", "Projects", "Education"];
const navIds = ["#aboutme", "#skills", "#projects", "#education"];

navItems.forEach((item, i) => {
  const li = $(`
    <li class="nav-item">
      <a class="nav-link" href="${navIds[i]}">${item}</a>
    </li>
  `);
  $("#navList").append(li);
});

// Smooth scrolling for nav links
$("a.nav-link").click(function (e) {
  e.preventDefault();
  const target = $($(this).attr("href"));
  $("html, body").animate({ scrollTop: target.offset().top - 80 }, 800);
});
