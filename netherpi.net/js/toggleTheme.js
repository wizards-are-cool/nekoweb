// modified from Emma Moore

const theme_sw_butt = document.querySelector("#theme-toggler button");
let theme1 = localStorage.getItem("theme");

if (theme1 === "dark") {
    if (theme_sw_butt)
        theme_sw_butt.querySelector("span").innerHTML =
            "<img class='pixel_but' src='/assets/img/sun.gif' alt='sun'/><span class='butt-text'>change theme</span>";
} else {
    if (theme_sw_butt)
        theme_sw_butt.querySelector("span").innerHTML =
            "<img class='pixel' src='/assets/img/moon.gif' alt='moon'/> <span class='butt-text'>change theme</span>";
}

theme_sw_butt.addEventListener("click", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
        setDarkTheme();
        if (theme_sw_butt)
            theme_sw_butt.querySelector("span").innerHTML =
                "<img class='pixel' src='/assets/img/sun.gif' alt='sun'/> <span class='butt-text'>change theme</span>";
    } else {
        setLightTheme();
        if (theme_sw_butt)
            theme_sw_butt.querySelector("span").innerHTML =
                "<img class='pixel' src='/assets/img/moon.gif' alt='moon'/> <span class='butt-text'>change theme</span>";
    }
});
function setDarkTheme() {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
}
function setLightTheme() {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
}
