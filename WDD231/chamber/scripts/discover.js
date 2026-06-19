import { places } from "../data/place.mjs";

const cards = document.querySelector("#discover-cards");

places.forEach(place => {

    const card = document.createElement("article");
    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="${place.image}"
                alt="${place.name}"
                loading="lazy"
                width="300"
                height="200">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button>Learn More</button>
    `;

    cards.appendChild(card);
});


// LAST VISIT MESSAGE

const message = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {

    message.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const days =
        Math.floor(
            (Date.now() - Number(lastVisit))
            / 86400000
        );

    if (days < 1) {

        message.textContent =
            "Back so soon! Awesome!";

    } else if (days === 1) {

        message.textContent =
            "You last visited 1 day ago.";

    } else {

        message.textContent =
            `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", Date.now());


// FOOTER

document.querySelector("#currentyear").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;