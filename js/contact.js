/* =========================================================
   CONVERTLY — CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formSuccess =
        document.getElementById("formSuccess");


    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const subject =
                document.getElementById("subject");

            const message =
                document.getElementById("message");


            /* ---------------------------------------------
               Basic validation
            --------------------------------------------- */

            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !subject.value ||
                !message.value.trim()
            ) {

                formSuccess.classList.remove("show");

                alert(
                    "Please fill in all required fields."
                );

                return;
            }


            /* ---------------------------------------------
               Email validation
            --------------------------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email.value.trim())) {

                formSuccess.classList.remove("show");

                alert(
                    "Please enter a valid email address."
                );

                email.focus();

                return;
            }


            /* ---------------------------------------------
               Show success message
            --------------------------------------------- */

            formSuccess.textContent =
                "✓ Thanks! Your message has been prepared.";

            formSuccess.classList.add("show");


            /* ---------------------------------------------
               Create mailto link
            --------------------------------------------- */

            const recipient =
                "hello@convertly.com";

            const emailSubject =
                encodeURIComponent(
                    subject.options[
                        subject.selectedIndex
                    ].text
                );

            const emailBody =
                encodeURIComponent(
                    "Name: " +
                    name.value.trim() +
                    "\n\n" +

                    "Email: " +
                    email.value.trim() +
                    "\n\n" +

                    "Message:\n" +
                    message.value.trim()
                );


            const mailto =
                `mailto:${recipient}` +
                `?subject=${emailSubject}` +
                `&body=${emailBody}`;


            /* ---------------------------------------------
               Open email application
            --------------------------------------------- */

            setTimeout(() => {

                window.location.href = mailto;

            }, 500);

        });

    }



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


    /* ---------------------------------------------
       Load saved theme
    --------------------------------------------- */

    const savedTheme =
        localStorage.getItem(
            "convertly-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }


    updateThemeIcon();


    /* ---------------------------------------------
       Toggle theme
    --------------------------------------------- */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark"
                );


                const darkMode =
                    document.body.classList.contains(
                        "dark"
                    );


                localStorage.setItem(
                    "convertly-theme",
                    darkMode
                        ? "dark"
                        : "light"
                );


                updateThemeIcon();

            }
        );

    }



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuButton && mainNav) {

        menuButton.addEventListener(
            "click",
            () => {

                mainNav.classList.toggle(
                    "mobile-open"
                );


                const menuOpen =
                    mainNav.classList.contains(
                        "mobile-open"
                    );


                menuButton.textContent =
                    menuOpen ? "✕" : "☰";

            }
        );


        /* ---------------------------------------------
           Close menu after clicking a link
        --------------------------------------------- */

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



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mainNav
            ) {

                mainNav.classList.remove(
                    "mobile-open"
                );


                if (menuButton) {

                    menuButton.textContent =
                        "☰";

                }

            }

        }
    );



    /* =====================================================
       INPUT FOCUS EFFECT
    ===================================================== */

    const inputs =
        document.querySelectorAll(
            ".form-group input, " +
            ".form-group select, " +
            ".form-group textarea"
        );


    inputs.forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                input.closest(
                    ".form-group"
                )?.classList.add(
                    "focused"
                );

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input.closest(
                    ".form-group"
                )?.classList.remove(
                    "focused"
                );

            }
        );

    });

});