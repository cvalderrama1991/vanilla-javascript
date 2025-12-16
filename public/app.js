const root = document.querySelector("[data-theme]");
const theme_selector = document.querySelector("[data-selector=theme]");
const STORAGE_KEY = 'theme';

// Load Saved Theme
function loadTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'systeme';

  root.setAttribute("data-theme", savedTheme);
  theme_selector.value = savedTheme;
}

// Save and Apply Theme
function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

theme_selector.addEventListener('change', (e) => {
  setTheme(e.target.value);

  console.log(theme_selector.value);
});

// Initial Theme
loadTheme();

