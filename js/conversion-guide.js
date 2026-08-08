/* =========================================================
   CONVERTLY — CONVERSION GUIDE JS
========================================================= */


/* =========================================================
   DARK MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {

    if (!themeToggle) return;

    const darkMode =
        document.body.classList.contains("dark");

    themeToggle.textContent =
        darkMode ? "☀" : "☾";
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

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const darkMode =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "convertly-theme",
            darkMode ? "dark" : "light"
        );

        updateThemeIcon();

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.querySelector(".main-nav");


if (menuButton && mainNav) {

    menuButton.addEventListener("click", () => {

        mainNav.classList.toggle("mobile-open");

        menuButton.textContent =
            mainNav.classList.contains("mobile-open")
                ? "✕"
                : "☰";

    });


    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("mobile-open");

            menuButton.textContent = "☰";

        });

    });

}


/* =========================================================
   GUIDE SEARCH
========================================================= */

const guideSearch =
    document.getElementById("guideSearch");

const guideSections =
    document.querySelectorAll(".guide-section");


if (guideSearch) {

    guideSearch.addEventListener("input", () => {

        const query =
            guideSearch.value
                .toLowerCase()
                .trim();


        if (!query) {

            guideSections.forEach(section => {

                section.style.display = "";

            });

            return;
        }


        guideSections.forEach(section => {

            const text =
                section.textContent.toLowerCase();

            section.style.display =
                text.includes(query)
                    ? ""
                    : "none";

        });

    });

}


/* =========================================================
   CTRL + K SEARCH
========================================================= */

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        if (guideSearch) {

            guideSearch.focus();

            guideSearch.select();

        }

    }

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(".guide-link")
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId.startsWith("#")) return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =========================================================
   ACTIVE SIDEBAR LINK
========================================================= */

const guideLinks =
    document.querySelectorAll(".guide-link");


if (
    guideLinks.length &&
    guideSections.length &&
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const currentId =
                        "#" + entry.target.id;


                    guideLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === currentId
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-20% 0px -65% 0px",

                threshold: 0
            }
        );


    guideSections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealItems =
    document.querySelectorAll(
        ".guide-section, .tip-card, .formula-box > div"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "guide-visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.08
            }
        );


    revealItems.forEach(item => {

        item.classList.add(
            "guide-reveal"
        );

        revealObserver.observe(item);

    });

}


/* =========================================================
   INITIALIZE
========================================================= */

loadTheme();