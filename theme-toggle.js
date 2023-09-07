// Theme Toggle Button Element
const themeToggle = document.getElementById("theme-toggle");

// Theme Stylesheet Link Element
const themeStylesheet = document.getElementById("theme-stylesheet");

// Event Listener for Theme Toggle
themeToggle.addEventListener("change", function () {
    if (themeToggle.checked) {
        // go dark mode
        themeStylesheet.href = "dark-theme.css";
    } else {
        // Light Theme (default) ## orginal oso
        themeStylesheet.href = "light-theme.css";
    }
});
