/* =========================================================
   CONVERTLY — ABOUT PAGE
   about.js
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.querySelector(".main-nav");


/* =========================================================
   DARK MODE
========================================================= */

function updateThemeIcon() {

    if (!themeToggle) return;

    const isDark =
        document.body.classList.contains("dark");

    themeToggle.textContent =
        isDark ? "☀" : "☾";

    themeToggle.title =
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode";
}


function loadTheme() {

    const savedTheme =
        localStorage.getItem("convertly-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }

    updateThemeIcon();
}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "convertly-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuButton && mainNav) {

    menuButton.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle(
                "mobile-open"
            );

            menuButton.textContent =
                mainNav.classList.contains(
                    "mobile-open"
                )
                    ? "✕"
                    : "☰";

        }
    );


    /* Close menu after clicking a link */

    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "mobile-open"
                    );

                    menuButton.textContent =
                        "☰";

                }
            );

        });

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".about-content-card, " +
        ".feature-card, " +
        ".offer-card, " +
        ".about-stats > div, " +
        ".about-cta"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal-element"
            );

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

loadTheme();