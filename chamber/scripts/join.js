// timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// open modals
document.querySelectorAll("button[data-modal]").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.modal;
    document.getElementById(id).showModal();
  });
});

// close modals
document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest("dialog").close();
  });
});

// close when clicking outside modal
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});