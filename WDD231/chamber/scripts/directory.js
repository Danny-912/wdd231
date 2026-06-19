// --------------------
// HAMBURGER MENU
// --------------------

const menuButton = document.querySelector("#menu");

const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        menuButton.classList.toggle("open");

    });

}



// --------------------
// MEMBER DIRECTORY
// --------------------

const url = "data/members.json";

const cards = document.querySelector("#members");



async function getMembers() {

    const response = await fetch(url);

    const data = await response.json();

    displayMembers(data);

}

getMembers();



// --------------------
// DISPLAY MEMBERS
// --------------------

const displayMembers = (members) => {

    members.forEach((member) => {

        const card = document.createElement("section");

        const image = document.createElement("img");

        const name = document.createElement("h3");

        const address = document.createElement("p");

        const phone = document.createElement("p");

        const website = document.createElement("a");

        const membership = document.createElement("p");

        const description = document.createElement("p");



        // TEXT CONTENT

        name.textContent = member.name;

        address.textContent = member.address;

        phone.textContent = member.phone;

        membership.textContent =
            `Membership Level: ${member.membership}`;

        description.textContent = member.description;



        // WEBSITE LINK

        website.href = member.website;

        website.textContent = member.website;

        website.target = "_blank";



        // IMAGE

        image.setAttribute("src", `images/${member.image}`);

        image.setAttribute("alt", `${member.name} Logo`);

        image.setAttribute("loading", "lazy");

        image.setAttribute("width", "300");

        image.setAttribute("height", "200");



        // APPEND ELEMENTS

        card.appendChild(image);

        card.appendChild(name);

        card.appendChild(address);

        card.appendChild(phone);

        card.appendChild(website);

        card.appendChild(membership);

        card.appendChild(description);



        cards.appendChild(card);

    });

};



// --------------------
// GRID / LIST TOGGLE
// --------------------

const gridButton = document.querySelector("#grid");

const listButton = document.querySelector("#list");


if (gridButton && listButton) {

    gridButton.addEventListener("click", () => {

        cards.classList.add("grid");

        cards.classList.remove("list");

    });


    listButton.addEventListener("click", () => {

        cards.classList.add("list");

        cards.classList.remove("grid");

    });

}



// --------------------
// FOOTER DATES
// --------------------

const currentYear = document.querySelector("#currentyear");

const lastModified = document.querySelector("#lastModified");


if (currentYear && lastModified) {

    currentYear.textContent =
        new Date().getFullYear();

    lastModified.textContent =
        `Last Modification: ${document.lastModified}`;

}