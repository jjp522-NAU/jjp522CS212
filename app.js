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
  "2025-12-31",  // Grand Prix
  "2024-10-22", //Time Shift
  "2023-7-23" //spacial defense
];

//PROJCECT ARRAY SECTION
// Get the container in HTML
const projectContainer = document.getElementById("projectContainer");

for (let i = 0; i < projectTitles.length; i++) {
  const title = projectTitles[i];
  const desc = projectDescriptions[i];
  const deadline = new Date(projectDeadlines[i]);
  const currentDate = new Date();

  // --- Comparison using <, >, === ---
  let statusText = "";
  if (deadline > currentDate) {
    statusText = "Ongoing";
  } else if (deadline < currentDate) {
    statusText = "Completed";
  } else if (deadline.getTime() === currentDate.getTime()) {
    statusText = "Due Today";
  }

  // Create the column
  const colDiv = document.createElement("div");
  colDiv.classList.add("col-md-6", "col-lg-4");

  // Card container
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "bg-dark", "border", "border-primary", "h-100");

  // Card body
  const bodyDiv = document.createElement("div");
  bodyDiv.classList.add("card-body");

  const titleEl = document.createElement("h5");
  titleEl.classList.add("card-title", "text-primary");
  titleEl.textContent = title;

  const descEl = document.createElement("p");
  descEl.classList.add("card-text", "small");
  descEl.textContent = desc;

  // Deadline
  const deadlineEl = document.createElement("p");
  deadlineEl.classList.add("text-info", "small", "mt-2");
  deadlineEl.textContent = `Deadline: ${projectDeadlines[i]}`;

  // Status element
  const statusEl = document.createElement("p");
  statusEl.classList.add("fw-bold");
  statusEl.textContent = `Status: ${statusText}`;
  statusEl.style.color =
    statusText === "Ongoing" ? "#00ff7f" :
    statusText === "Due Today" ? "#ffcc00" :
    "#877affff"; //for completed

  // Assemble
  bodyDiv.appendChild(titleEl);
  bodyDiv.appendChild(descEl);
  bodyDiv.appendChild(deadlineEl);
  bodyDiv.appendChild(statusEl);
  cardDiv.appendChild(bodyDiv);
  colDiv.appendChild(cardDiv);
  projectContainer.appendChild(colDiv);
}

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
