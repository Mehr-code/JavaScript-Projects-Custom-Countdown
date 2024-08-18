const inputContainer = document.getElementById("input-container");
const CountdownForm = document.getElementById("CountdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownElBtn = document.getElementById("countdown-button");
const timeElement = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor(((distance % day) % hour) / minute);
    const seconds = Math.floor((((distance % day) % hour) % minute) / second);

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElement[0].textContent = `${days}`;
    timeElement[1].textContent = `${hours}`;
    timeElement[2].textContent = `${minutes}`;
    timeElement[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;
    // Show countdown
    countdownEl.hidden = false;
  }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  // Get number version of current Date, update DOM
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

// Reset All values
function reset() {
  // Hide countdown
  countdownEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);

  // Reset values
  countdownTitle = "";
  countdownDate = "";
}

// Event Listeners
CountdownForm.addEventListener("submit", updateCountdown);
countdownElBtn.addEventListener("click", reset);
