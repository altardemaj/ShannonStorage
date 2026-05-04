const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const demoForm = document.querySelector("[data-demo-form]");
const formNote = document.querySelector("[data-form-note]");
const roomSlider = document.querySelector("[data-room-slider]");
const roomCount = document.querySelector("[data-room-count]");
const unitSuggestion = document.querySelector("[data-unit-suggestion]");
const requestForm = document.querySelector("[data-request-form]");
const requestNote = document.querySelector("[data-request-note]");

const requestUrl = "request-a-unit.html";
const requestEmail = "info@shannonstorage.ny";

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 30);
}

function updateAdvisor() {
  if (!roomSlider || !roomCount || !unitSuggestion) return;

  const rooms = Number(roomSlider.value);
  const label = rooms === 1 ? "1 room" : `${rooms} rooms`;
  const recommendation = rooms <= 1
    ? "Small unit recommended"
    : rooms <= 3
      ? "Medium unit recommended"
      : "Large unit recommended";

  roomCount.textContent = label;
  unitSuggestion.textContent = recommendation;
}

if (header) {
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

if (menuButton && mobilePanel) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobilePanel.classList.toggle("is-open");
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mobilePanel.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      mobilePanel.classList.remove("is-open");
      menuButton.setAttribute("aria-label", "Open menu");
    }
  });
}

if (demoForm && formNote) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Opening Shannon Storage's existing request form...";
    setTimeout(() => {
      window.location.href = requestUrl;
    }, 450);
  });
}

if (roomSlider) {
  roomSlider.addEventListener("input", updateAdvisor);
}
updateAdvisor();

if (requestForm && requestNote) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(requestForm);
    const lines = [
      "New Shannon Storage unit request",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Preferred contact: ${formData.get("contactMethod") || ""}`,
      "",
      `Current address: ${formData.get("address") || ""}`,
      `Move-in date: ${formData.get("moveDate") || ""}`,
      `Unit size: ${formData.get("unitSize") || ""}`,
      `Storage type: ${formData.get("storageType") || ""}`,
      "",
      `Notes: ${formData.get("notes") || ""}`,
    ];
    const subject = encodeURIComponent("New storage unit request");
    const body = encodeURIComponent(lines.join("\n"));

    requestNote.textContent = `Opening an email to ${requestEmail} with this request.`;
    requestForm.classList.add("is-submitted");
    window.location.href = `mailto:${requestEmail}?subject=${subject}&body=${body}`;
  });
}
