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
