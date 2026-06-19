// Handles DOM updates and background changes

export function displayWeather(data) {
    const weatherDiv = document.getElementById("weatherResult");
    const city = data.name;
    const temp = data.main.temp;
    const condition = data.weather[0].main;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDiv.innerHTML = `
        <strong>${city}</strong>: ${temp}°C, ${condition} 
        <img src="${iconUrl}" alt="${condition}" style="vertical-align:middle;width:50px;">
    `;
}

export function displayClothingSuggestion(suggestion) {
    const clothingDiv = document.getElementById("clothingSuggestion");
    clothingDiv.innerText = suggestion;
}

export function updateBackground(condition) {
    const body = document.body;
    let imagePath = "";

    switch (condition) {
        case "Rain":
        case "Drizzle":
        case "Thunderstorm":
            imagePath = "images/rainy.jpg";
            break;
        case "Clear":
            imagePath = "images/sunny.jpg";
            break;
        case "Clouds":
            imagePath = "images/cloudy.jpg";
            break;
        case "Snow":
            imagePath = "images/snow.jpg";
            break;
        default:
            imagePath = "images/sunny.jpg";
    }

    body.style.backgroundImage = `url('${imagePath}')`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.transition = "background-image 0.5s ease-in-out";
}

export function displayRecentSearches(cities, clickHandler) {
    const container = document.getElementById("recentSearches");
    container.innerHTML = "";
    cities.forEach(city => {
        const btn = document.createElement("button");
        btn.innerText = city;
        btn.addEventListener("click", () => clickHandler(city));
        container.appendChild(btn);
    });
}