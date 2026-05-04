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
    requestNote.textContent = "Thanks. This request form is ready to connect to Shannon Storage's email or CRM before launch.";
    requestForm.classList.add("is-submitted");
  });
}
