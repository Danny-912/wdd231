// scripts/weatherApi.js
// Handles fetching weather data from OpenWeatherMap API

const API_KEY = "890f33d9eb0394c34e17a707e206113c";

export async function fetchWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}