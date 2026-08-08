/* =========================================================
   CONVERTLY — POPULAR CONVERSIONS PAGE
   popular-conversions.js
========================================================= */


/* =========================================================
   1. ELEMENTS
========================================================= */

const conversionSearch =
    document.getElementById("conversionSearch");

const conversionGrid =
    document.getElementById("conversionGrid");

const conversionEmpty =
    document.getElementById("conversionEmpty");

const conversionCount =
    document.getElementById("conversionCount");

const themeToggle =
    document.getElementById("themeToggle");

const menuButton =
    document.getElementById("menuButton");


/* =========================================================
   2. CONVERSION CARDS
========================================================= */

const conversionCards =
    Array.from(
        document.querySelectorAll(
            ".quick-card"
        )
    );


/* =========================================================
   3. UPDATE COUNT
========================================================= */

function updateCount(number) {

    conversionCount.textContent =
        `${number} conversion${number !== 1 ? "s" : ""}`;

}


/* =========================================================
   4. SEARCH / FILTER
========================================================= */

function filterConversions() {

    const query =
        conversionSearch.value
            .trim()
            .toLowerCase();


    let visibleCount = 0;


    conversionCards.forEach(card => {

        const searchText =
            (
                card.dataset.search +
                " " +
                card.dataset.category +
                " " +
                card.textContent
            ).toLowerCase();


        const matches =
            searchText.includes(query);


        if (matches) {

            card.style.display =
                "";

            visibleCount++;

        }

        else {

            card.style.display =
                "none";

        }

    });


    updateCount(
        visibleCount
    );


    conversionEmpty.hidden =
        visibleCount !== 0;

}


/* =========================================================
   5. SEARCH INPUT
========================================================= */

conversionSearch.addEventListener(
    "input",
    filterConversions
);


/* =========================================================
   6. CTRL + K SEARCH
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            conversionSearch.focus();

            conversionSearch.select();

        }

    }
);


/* =========================================================
   7. ESCAPE SEARCH
========================================================= */

conversionSearch.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            conversionSearch.value = "";

            filterConversions();

            conversionSearch.blur();

        }

    }
);


/* =========================================================
   8. CARD CLICK
========================================================= */

conversionCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const category =
                card.dataset.category;


            /*
             * Open the main converter page
             * with the selected category.
             */

            window.location.href =
                `index.html?converter=${encodeURIComponent(category)}`;

        }
    );

});


/* =========================================================
   9. DARK MODE
========================================================= */

function updateThemeIcon() {

    const isDark =
        document.body.classList.contains(
            "dark"
        );


    if (isDark) {

        themeToggle.textContent =
            "☀";

        themeToggle.title =
            "Switch to light mode";

    }

    else {

        themeToggle.textContent =
            "☾";

        themeToggle.title =
            "Switch to dark mode";

    }

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "convertly-theme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

    }


    updateThemeIcon();

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "convertly-theme",
            isDark
                ? "dark"
                : "light"
        );


        updateThemeIcon();

    }
);


/* =========================================================
   10. MOBILE MENU
========================================================= */

menuButton.addEventListener(
    "click",
    () => {

        const nav =
            document.querySelector(
                ".main-nav"
            );


        const isOpen =
            nav.classList.toggle(
                "mobile-open"
            );


        if (isOpen) {

            nav.style.display =
                "flex";

            nav.style.position =
                "absolute";

            nav.style.top =
                "66px";

            nav.style.left =
                "0";

            nav.style.right =
                "0";

            nav.style.padding =
                "15px 20px 20px";

            nav.style.flexDirection =
                "column";

            nav.style.alignItems =
                "stretch";

            nav.style.gap =
                "4px";

            nav.style.background =
                "var(--surface)";

            nav.style.borderBottom =
                "1px solid var(--border)";

            nav.style.boxShadow =
                "var(--shadow)";


            nav.querySelectorAll("a")
                .forEach(link => {

                    link.style.padding =
                        "12px 5px";

                });

        }

        else {

            nav.removeAttribute(
                "style"
            );

            nav.querySelectorAll("a")
                .forEach(link => {

                    link.removeAttribute(
                        "style"
                    );

                });

        }

    }
);


/* =========================================================
   11. INITIALIZE
========================================================= */

loadTheme();

filterConversions();