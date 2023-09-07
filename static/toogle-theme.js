// the button
const themeToggle = document.getElementById("theme-toggle");

// the stylesheet
const themeStylesheet = document.getElementById("theme-stylesheet");

// see if change being use
themeToggle.addEventListener("change", function () {
    if (themeToggle.checked) {
        // Dark theme
        themeStylesheet.href = "dark-theme.css";
    } else {
        // Light Theme (default)
        themeStylesheet.href = "light-theme.css";
    }
});
