const params = new URLSearchParams(window.location.search);

document.getElementById("output").innerHTML = `
  <p><strong>First Name:</strong> ${params.get("firstname")}</p>
  <p><strong>Last Name:</strong> ${params.get("lastname")}</p>
  <p><strong>Email:</strong> ${params.get("email")}</p>
  <p><strong>Phone:</strong> ${params.get("phone")}</p>
  <p><strong>Organization:</strong> ${params.get("organization")}</p>
  <p><strong>Timestamp:</strong> ${params.get("timestamp")}</p>
`;