/* =========================================================
   CONVERTLY — FAQ JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("active");


            // Close all other questions
            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherButton =
                        otherItem.querySelector(".faq-question");

                    if (otherButton) {
                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                }

            });


            // Toggle current question
            item.classList.toggle(
                "active",
                !isOpen
            );

            question.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        });

    });


    /* =====================================================
       FAQ SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("faqSearch");

    const noResults =
        document.getElementById("faqNoResults");


    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();

            let visibleItems = 0;


            faqItems.forEach(item => {

                const text =
                    item.textContent
                        .toLowerCase();

                const match =
                    text.includes(searchTerm);


                if (match) {

                    item.style.display = "";

                    visibleItems++;

                } else {

                    item.style.display = "none";

                }

            });


            // Hide empty categories
            document
                .querySelectorAll(".faq-category")
                .forEach(category => {

                    const visible =
                        category.querySelectorAll(
                            ".faq-item:not([style*='display: none'])"
                        );

                    category.style.display =
                        visible.length > 0
                            ? ""
                            : "none";

                });


            // Show no-results message
            if (noResults) {

                noResults.classList.toggle(
                    "visible",
                    visibleItems === 0
                );

            }

        });

    }


    /* =====================================================
       CTRL + K SEARCH
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (searchInput) {

                searchInput.focus();

                searchInput.select();

            }

        }

    });


    /* =====================================================
       DARK MODE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");


    function updateThemeIcon() {

        if (!themeToggle) return;

        const isDark =
            document.body.classList.contains("dark");

        themeToggle.textContent =
            isDark ? "☀" : "☾";

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }


    // Load saved theme
    const savedTheme =
        localStorage.getItem("convertly-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }

    updateThemeIcon();


    // Toggle theme
    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");


            localStorage.setItem(
                "convertly-theme",
                isDark ? "dark" : "light"
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

            mainNav.classList.toggle(
                "mobile-open"
            );


            const menuOpen =
                mainNav.classList.contains(
                    "mobile-open"
                );


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
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            faqItems.forEach(item => {

                item.classList.remove("active");

            });

        }

    });


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (question) {

            question.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});