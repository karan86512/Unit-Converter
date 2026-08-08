/* =========================================================
   CONVERTLY — PRIVACY POLICY JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DARK MODE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");


    function updateThemeIcon() {

        if (!themeToggle) return;

        const darkMode =
            document.body.classList.contains("dark");

        themeToggle.textContent =
            darkMode ? "☀" : "☾";

        themeToggle.setAttribute(
            "aria-label",
            darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }


    const savedTheme =
        localStorage.getItem("convertly-theme");


    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }


    updateThemeIcon();


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


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuButton && mainNav) {

        menuButton.addEventListener("click", () => {

            mainNav.classList.toggle("mobile-open");

            const menuOpen =
                mainNav.classList.contains("mobile-open");

            menuButton.textContent =
                menuOpen ? "✕" : "☰";

        });


        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mainNav.classList.remove(
                        "mobile-open"
                    );

                    menuButton.textContent = "☰";

                });

            });

    }


    /* =====================================================
       SMOOTH SIDEBAR NAVIGATION
    ===================================================== */

    const legalLinks =
        document.querySelectorAll(
            ".legal-sidebar a"
        );


    legalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) return;


            event.preventDefault();


            const headerOffset = 95;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });


            history.replaceState(
                null,
                "",
                targetId
            );

        });

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (mainNav) {

                mainNav.classList.remove(
                    "mobile-open"
                );

            }

            if (menuButton) {

                menuButton.textContent = "☰";

            }

        }

    });


    /* =====================================================
       ACTIVE SIDEBAR LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            ".legal-section h2"
        );


    function updateActiveSection() {

        let currentId = "";

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 130) {

                currentId = section.id;

            }

        });


        legalLinks.forEach(link => {

            link.classList.remove("active");

            if (
                currentId &&
                link.getAttribute("href") ===
                "#" + currentId
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveSection,
        { passive: true }
    );


    updateActiveSection();

});