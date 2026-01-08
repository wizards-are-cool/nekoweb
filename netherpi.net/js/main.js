console.log("Hi there!");
const darkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)",
).matches;
const theme = darkPreference ? "dark" : "light";
document.documentElement.setAttribute("data-theme", theme);
