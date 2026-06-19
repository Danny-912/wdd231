// scripts/clothingLogic.js
// Determines clothing suggestions based on weather

export function getClothingSuggestion(temp, condition) {
    // Rainy condition check
    const rainConditions = ["Rain", "Drizzle", "Thunderstorm"];
    if (rainConditions.includes(condition)) {
        return "Take an umbrella and wear waterproof shoes!";
    }

    if (temp >= 25) {
        return "It's hot! Wear a T-shirt, singlet, face cap, short. PS: Don't forget your Sunscreen🌞";
    } else if (temp >= 18) {
        return "Warm weather. Light clothing is fine. E.G Crop top & Baggy Jean";
    } else if (temp >= 10) {
        return "Cool weather. Wear a sweater or long pants. Beware of Pneumonia";
    } else {
        return "Cold weather! Wear a winter jacket, Joggers, a winter coat. It's really cold out there🥶";
    }
}