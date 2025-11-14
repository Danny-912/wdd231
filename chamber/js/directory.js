// members.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".members-container");
  const gridBtn = document.querySelector("#grid-view");
  const listBtn = document.querySelector("#list-view");

  // Async function to fetch members
  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error fetching members:", error);
      container.innerHTML = "<p>Failed to load members.</p>";
    }
  }

  // Function to display members
  function displayMembers(list) {
    container.innerHTML = ""; // clear container
    list.forEach(member => {
      const card = document.createElement("article");
      card.classList.add("member-card");
      card.innerHTML = `
        
        <h2>${member.name}</h2>
        <p> ${member.address}</p>
        <p> ${member.phone}</p>
        <p> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p> ${membershipText(member.membershipLevel)}</p>
        
      `;
      container.appendChild(card);
    });
  }

  // Helper function for membership text
  function membershipText(level) {
    switch (level) {
      case 1: return "Member";
      case 2: return "Silver";
      case 3: return "Gold";
      default: return "Member";
    }
  }

  // Toggle views
  gridBtn.addEventListener("click", () => {
    container.classList.remove("list-view");
    container.classList.add("grid-view");
  });

  listBtn.addEventListener("click", () => {
    container.classList.remove("grid-view");
    container.classList.add("list-view");
  });

  // Initial fetch
  fetchMembers();
});
