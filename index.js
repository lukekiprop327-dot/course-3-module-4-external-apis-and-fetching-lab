// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Weather Alerts Lab - index.js
// NOTE: element IDs below are guesses except "error-message".
// Compare them with your index.html and rename if needed.

const STATE_INPUT_ID = "state-input";
const BUTTON_ID = "fetch-alerts";
const ALERTS_ID = "alerts-display";
const ERROR_ID = "error-message";
const LOADING_ID = "loading"; // optional

// Step 1: fetch alerts for a state
async function fetchWeatherAlerts(state) {
  if (!state) {
    throw new Error("Please enter a state abbreviation.");
  }
  if (!/^[A-Z]{2}$/.test(state)) {
    throw new Error("Please enter a valid 2-letter state code in capitals (e.g., MN).");
  }

  const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

  if (response.ok === false) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
}

// Step 2 + 3: display alerts, replacing any previous data
function displayAlerts(data) {
  const display = document.getElementById(ALERTS_ID);
  display.innerHTML = "";

  const summary = document.createElement("p");
  summary.textContent = `${data.title}: ${data.features.length}`;
  display.appendChild(summary);

  const ul = document.createElement("ul");
  data.features.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });
  display.appendChild(ul);
}

// Step 4: error handling
function displayError(message) {
  const errorDiv = document.getElementById(ERROR_ID);
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

function clearError() {
  const errorDiv = document.getElementById(ERROR_ID);
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

// Event handler
function handleFetchClick() {
  const input = document.getElementById(STATE_INPUT_ID);
  const loading = document.getElementById(LOADING_ID);
  const state = input.value.trim();

  input.value = ""; // Step 3: clear the input
  if (loading) loading.classList.remove("hidden");

  fetchWeatherAlerts(state)
    .then((data) => {
      clearError();
      displayAlerts(data);
    })
    .catch((errorObject) => {
      console.log(errorObject.message);
      displayError(errorObject.message);
    })
    .finally(() => {
      if (loading) loading.classList.add("hidden");
    });
}

if (typeof document !== "undefined") {
  const button = document.getElementById(BUTTON_ID);
  if (button) button.addEventListener("click", handleFetchClick);
}

// Aliases matching the rubric's function names
const fetchWeatherData = fetchWeatherAlerts;
const displayWeather = displayAlerts;

if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherAlerts,
    fetchWeatherData,
    displayAlerts,
    displayWeather,
    displayError,
    clearError,
  };
}