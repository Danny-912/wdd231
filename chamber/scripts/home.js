// ===============================
// 🌦 WEATHER SECTION
// ===============================

// ⚠️ Replace with your own API key
const apiKey = "890f33d9eb0394c34e17a707e206113c";

// ⚠️ Set your location (Benin City recommended)
const lat = 6.335;
const lon = 5.6037;

// DOM elements
const tempEl = document.querySelector("#temp");
const descEl = document.querySelector("#desc");
const iconEl = document.querySelector("#weather-icon");
const forecastEl = document.querySelector("#forecast");

// OpenWeatherMap URL (Current + Forecast)
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;


// -------------------------------
// CURRENT WEATHER
// -------------------------------
async function getCurrentWeather() {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather data not available");
        }

        const data = await response.json();

        tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        descEl.textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconEl.alt = data.weather[0].description;

    } catch (error) {
        console.error("Weather Error:", error);
        tempEl.textContent = "N/A";
        descEl.textContent = "Unable to load weather";
    }
}


// -------------------------------
// 3-DAY FORECAST
// -------------------------------
async function getForecast() {
    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Forecast not available");
        }

        const data = await response.json();

        // Filter one forecast per day (every 24 hours approx)
        const dailyForecast = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        ).slice(0, 3);

        forecastEl.innerHTML = "<h4>3-Day Forecast</h4>";

        dailyForecast.forEach((day, index) => {
            const date = new Date(day.dt_txt);

            forecastEl.innerHTML += `
                <p>
                    Day ${index + 1}:
                    ${Math.round(day.main.temp)}°C -
                    ${day.weather[0].description}
                </p>
            `;
        });

    } catch (error) {
        console.error("Forecast Error:", error);
        forecastEl.innerHTML = "<p>Forecast unavailable</p>";
    }
}


// ===============================
// 🏢 SPOTLIGHT SECTION
// ===============================

const spotlightContainer = document.querySelector("#spotlight-container");

// Load JSON + generate spotlights
async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Members data not found");
        }

        const members = await response.json();

        // Filter Gold (3) and Silver (2)
        let eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        // Shuffle array (Fisher-Yates)
        for (let i = eligibleMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [eligibleMembers[i], eligibleMembers[j]] = [eligibleMembers[j], eligibleMembers[i]];
        }

        // Pick 2–3 members
        const selected = eligibleMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <h3>${member.name}</h3>
                <hr>

                <div class="spotlight-content">
                    <img src="images/${member.image}" alt="${member.name} logo">

                    <div class="spotlight-info">
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <a href="${member.website}" target="_blank">Visit Website</a>
                        <p>Membership: ${member.membership === 3 ? "Gold" : "Silver"}</p>
                    </div>
                </div>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight Error:", error);
        spotlightContainer.innerHTML = "<p>Unable to load spotlights</p>";
    }
}


// ===============================
// 🚀 INIT ALL FUNCTIONS
// ===============================
getCurrentWeather();
getForecast();
loadSpotlights();