const apiKey = "890f33d9eb0394c34e17a707e206113c";
const city = "Benin City";
const country = "NG";

// DOM elements
const weatherNow = document.getElementById("weather-now");
const forecastDiv = document.getElementById("forecast");

// Current weather URL
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;

// Forecast URL (3-hour forecast)
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;

// Fetch current weather
async function getCurrentWeather() {
  try {
    const response = await fetch(currentWeatherURL);
    const data = await response.json();

    weatherNow.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>${Math.round(data.main.temp)}°C</p>
      <p>${data.weather[0].description}</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherNow.innerHTML = `<p>Unable to load weather data.</p>`;
    console.error(error);
  }
}

// Fetch forecast
async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    const data = await response.json();

    // Show next 3 days (one forecast per day)
    const dailyForecasts = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    forecastDiv.innerHTML = "";

    dailyForecasts.slice(0, 3).forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString();
      forecastDiv.innerHTML += `
        <p>
          <strong>${date}</strong><br>
          ${Math.round(day.main.temp)}°C — ${day.weather[0].description}
        </p>
      `;
    });

  } catch (error) {
    forecastDiv.innerHTML = `<p>Unable to load forecast.</p>`;
    console.error(error);
  }
}

// Run functions
getCurrentWeather();
getForecast();


const eventsList = document.getElementById("events-list");

function displayEvents() {
  eventsList.innerHTML = "";

  events.slice(0, 3).forEach(event => {
    const eventDate = new Date(event.date).toLocaleDateString();

    eventsList.innerHTML += `
      <div class="event">
        <h4>${event.title}</h4>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
      </div>
    `;
  });
}

displayEvents();
