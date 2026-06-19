// scripts/main.js
// Entry point: sets up event listeners and handles user interactions

import { fetchWeather } from "./weatherApi.js";
import { getClothingSuggestion } from "./clothingLogic.js";
import { displayWeather, displayClothingSuggestion, updateBackground, displayRecentSearches } from "./ui.js";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

function saveRecentCity(city) {
    // Avoid duplicates
    recentCities = recentCities.filter(c => c.toLowerCase() !== city.toLowerCase());
    recentCities.unshift(city);
    if (recentCities.length > 5) recentCities.pop(); // keep only last 5
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
}

async function searchCity(city) {
    try {
        const data = await fetchWeather(city);
        displayWeather(data);
        const temp = data.main.temp;
        const condition = data.weather[0].main;
        const suggestion = getClothingSuggestion(temp, condition);
        displayClothingSuggestion(suggestion);
        updateBackground(condition);
        saveRecentCity(city);
        displayRecentSearches(recentCities, searchCity);
    } catch (error) {
    console.error("Search Error:", error);
    alert(error.message);
}
}

// Initial render of recent searches
displayRecentSearches(recentCities, searchCity);

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        searchCity(city);
        cityInput.value = "";
    }
});

cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});