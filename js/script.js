 /* =========================================================
   CONVERTLY — UNIT CONVERTER
   script.js
========================================================= */


/* =========================================================
   1. CONVERTER DATA
========================================================= */

const converters = {

    length: {
        title: "Length Converter",
        icon: "📏",
        description: "Convert meters, kilometers, miles, feet and more.",
        color: "#fff0ed",

        units: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.344,
            yard: 0.9144,
            foot: 0.3048,
            inch: 0.0254,
            "nautical mile": 1852
        }
    },


    weight: {
        title: "Weight Converter",
        icon: "⚖️",
        description: "Convert kilograms, grams, pounds, ounces and more.",
        color: "#f0f5ff",

        units: {
            kilogram: 1,
            gram: 0.001,
            milligram: 0.000001,
            pound: 0.45359237,
            ounce: 0.028349523125,
            ton: 1000
        }
    },


    temperature: {
        title: "Temperature Converter",
        icon: "🌡️",
        description: "Convert Celsius, Fahrenheit and Kelvin instantly.",
        color: "#fff5df",

        units: {
            celsius: "temperature",
            fahrenheit: "temperature",
            kelvin: "temperature"
        }
    },


    area: {
        title: "Area Converter",
        icon: "▦",
        description: "Convert square meters, acres, hectares and more.",
        color: "#edf9f3",

        units: {
            "square meter": 1,
            "square kilometer": 1000000,
            "square centimeter": 0.0001,
            "square foot": 0.09290304,
            "square yard": 0.83612736,
            "square mile": 2589988.110336,
            acre: 4046.8564224,
            hectare: 10000
        }
    },


    volume: {
        title: "Volume Converter",
        icon: "🧪",
        description: "Convert liters, gallons, milliliters and more.",
        color: "#f2efff",

        units: {
            liter: 1,
            milliliter: 0.001,
            "cubic meter": 1000,
            "cubic centimeter": 0.001,
            gallon: 3.785411784,
            quart: 0.946352946,
            pint: 0.473176473,
            cup: 0.2365882365
        }
    },


    time: {
        title: "Time Converter",
        icon: "⏱️",
        description: "Convert seconds, minutes, hours, days and more.",
        color: "#edf7ff",

        units: {
            second: 1,
            millisecond: 0.001,
            minute: 60,
            hour: 3600,
            day: 86400,
            week: 604800,
            month: 2629800,
            year: 31557600
        }
    },


    speed: {
        title: "Speed Converter",
        icon: "🚀",
        description: "Convert km/h, mph, m/s and other speed units.",
        color: "#fff0f6",

        units: {
            "meter per second": 1,
            "kilometer per hour": 0.2777777778,
            "mile per hour": 0.44704,
            knot: 0.5144444444,
            "foot per second": 0.3048
        }
    },


    data: {
        title: "Data Converter",
        icon: "💾",
        description: "Convert bytes, KB, MB, GB, TB and more.",
        color: "#f0f7ff",

        units: {
            byte: 1,
            kilobyte: 1024,
            megabyte: 1024 ** 2,
            gigabyte: 1024 ** 3,
            terabyte: 1024 ** 4,
            petabyte: 1024 ** 5
        }
    },


    pressure: {
        title: "Pressure Converter",
        icon: "🔵",
        description: "Convert Pascal, bar, PSI, atmosphere and more.",
        color: "#f4f1ff",

        units: {
            pascal: 1,
            kilopascal: 1000,
            bar: 100000,
            psi: 6894.757293168,
            atmosphere: 101325,
            torr: 133.3223684211
        }
    },


    energy: {
        title: "Energy Converter",
        icon: "⚡",
        description: "Convert joules, calories, kWh and more.",
        color: "#fff7df",

        units: {
            joule: 1,
            kilojoule: 1000,
            calorie: 4.184,
            kilocalorie: 4184,
            "watt hour": 3600,
            "kilowatt hour": 3600000
        }
    },


    angle: {
        title: "Angle Converter",
        icon: "📐",
        description: "Convert degrees, radians, turns and more.",
        color: "#eef8f3",

        units: {
            degree: 1,
            radian: 57.2957795131,
            gradian: 0.9,
            turn: 360
        }
    },


    frequency: {
        title: "Frequency Converter",
        icon: "〰️",
        description: "Convert Hertz, kilohertz, megahertz and more.",
        color: "#f4efff",

        units: {
            hertz: 1,
            kilohertz: 1000,
            megahertz: 1000000,
            gigahertz: 1000000000
        }
    }

};


/* =========================================================
   2. CATEGORY ORDER
========================================================= */

const categoryOrder = [
    "length",
    "weight",
    "temperature",
    "area",
    "volume",
    "time",
    "speed",
    "data",
    "pressure",
    "energy",
    "angle",
    "frequency"
];


/* =========================================================
   3. DOM ELEMENTS
========================================================= */

const toolGrid =
    document.getElementById("toolGrid");

const toolCount =
    document.getElementById("toolCount");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const categoryPills =
    document.getElementById("categoryPills");

const themeToggle =
    document.getElementById("themeToggle");

const menuButton =
    document.getElementById("menuButton");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalIcon =
    document.getElementById("modalIcon");

const fromValue =
    document.getElementById("fromValue");

const toValue =
    document.getElementById("toValue");

const fromUnit =
    document.getElementById("fromUnit");

const toUnit =
    document.getElementById("toUnit");

const swapButton =
    document.getElementById("swapButton");

const copyButton =
    document.getElementById("copyButton");

const formulaText =
    document.getElementById("formulaText");

const popularUnits =
    document.getElementById("popularUnits");

const toast =
    document.getElementById("toast");


/* =========================================================
   4. CURRENT STATE
========================================================= */

let currentCategory = "all";

let currentConverter = null;


/* =========================================================
   5. FORMAT UNIT NAME
========================================================= */

function formatUnitName(unit) {

    return unit
        .replaceAll("-", " ")
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

}


/* =========================================================
   6. RENDER TOOL CARDS
========================================================= */

function renderTools() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtered =
        categoryOrder.filter(category => {

            const converter =
                converters[category];

            const matchesCategory =
                currentCategory === "all" ||
                category === currentCategory;

            const searchableText = `
                ${converter.title}
                ${converter.description}
                ${category}
                ${Object.keys(converter.units).join(" ")}
            `.toLowerCase();

            const matchesSearch =
                !query ||
                searchableText.includes(query);

            return (
                matchesCategory &&
                matchesSearch
            );

        });


    toolGrid.innerHTML = "";


    toolCount.textContent =
        `${filtered.length} tool${filtered.length !== 1 ? "s" : ""}`;


    if (filtered.length === 0) {

        emptyState.hidden = false;

        return;

    }


    emptyState.hidden = true;


    filtered.forEach((category, index) => {

        const converter =
            converters[category];


        const card =
            document.createElement("article");

        card.className =
            "tool-card";


        card.style.animationDelay =
            `${index * 0.04}s`;


        card.style.setProperty(
            "--icon-bg",
            converter.color
        );


        card.style.setProperty(
            "--card-glow",
            converter.color
        );


        card.innerHTML = `

            <div class="tool-icon">
                ${converter.icon}
            </div>

            <h3>
                ${converter.title}
            </h3>

            <p>
                ${converter.description}
            </p>

            <button
                class="tool-link"
                data-open="${category}"
            >
                Open converter →
            </button>

        `;


        toolGrid.appendChild(card);

    });

}


/* =========================================================
   7. CATEGORY FILTER
========================================================= */

categoryPills.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".pill");


        if (!button) return;


        document
            .querySelectorAll(".pill")
            .forEach(pill => {

                pill.classList.remove("active");

            });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        renderTools();

    }
);


/* =========================================================
   8. SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    renderTools
);


/* =========================================================
   9. OPEN CONVERTER
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-open]"
            );


        if (!button) return;


        openConverter(
            button.dataset.open
        );

    }
);


/* =========================================================
   10. OPEN MODAL
========================================================= */

function openConverter(category) {

    const converter =
        converters[category];


    if (!converter) return;


    currentConverter =
        category;


    modalTitle.textContent =
        converter.title;


    modalIcon.textContent =
        converter.icon;


    modalCategory.textContent =
        category.toUpperCase();


    const units =
        Object.keys(
            converter.units
        );


    fromUnit.innerHTML = "";

    toUnit.innerHTML = "";


    units.forEach(unit => {

        const optionFrom =
            document.createElement("option");

        optionFrom.value =
            unit;

        optionFrom.textContent =
            formatUnitName(unit);


        const optionTo =
            document.createElement("option");

        optionTo.value =
            unit;

        optionTo.textContent =
            formatUnitName(unit);


        fromUnit.appendChild(
            optionFrom
        );

        toUnit.appendChild(
            optionTo
        );

    });


    /* Default units */

    if (category === "temperature") {

        fromUnit.value =
            "celsius";

        toUnit.value =
            "fahrenheit";

    }

    else if (category === "length") {

        fromUnit.value =
            "kilometer";

        toUnit.value =
            "mile";

    }

    else if (category === "weight") {

        fromUnit.value =
            "kilogram";

        toUnit.value =
            "pound";

    }

    else if (category === "data") {

        fromUnit.value =
            "gigabyte";

        toUnit.value =
            "megabyte";

    }

    else {

        fromUnit.value =
            units[0];

        toUnit.value =
            units[1] ||
            units[0];

    }


    fromValue.value = 1;


    populatePopularUnits(
        units
    );


    convertValue();


    modalBackdrop.hidden =
        false;


    document.body.style.overflow =
        "hidden";


    setTimeout(() => {

        fromValue.focus();

        fromValue.select();

    }, 100);

}


/* =========================================================
   11. CLOSE MODAL
========================================================= */

function closeConverter() {

    modalBackdrop.hidden =
        true;

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeConverter
);


modalBackdrop.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalBackdrop
        ) {

            closeConverter();

        }

    }
);


/* =========================================================
   12. KEYBOARD ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !modalBackdrop.hidden
        ) {

            closeConverter();

        }

    }
);


/* =========================================================
   13. CONVERT TEMPERATURE
========================================================= */

function convertTemperature(
    value,
    from,
    to
) {

    let celsius;


    /* Convert to Celsius */

    if (from === "celsius") {

        celsius = value;

    }

    else if (from === "fahrenheit") {

        celsius =
            (value - 32) * 5 / 9;

    }

    else if (from === "kelvin") {

        celsius =
            value - 273.15;

    }


    /* Celsius to target */

    if (to === "celsius") {

        return celsius;

    }

    if (to === "fahrenheit") {

        return (
            celsius * 9 / 5
        ) + 32;

    }

    if (to === "kelvin") {

        return (
            celsius + 273.15
        );

    }

}


/* =========================================================
   14. MAIN CONVERSION
========================================================= */

function calculateConversion(
    value,
    from,
    to
) {

    if (
        currentConverter ===
        "temperature"
    ) {

        return convertTemperature(
            value,
            from,
            to
        );

    }


    const units =
        converters[
            currentConverter
        ].units;


    const baseValue =
        value * units[from];


    return (
        baseValue / units[to]
    );

}


/* =========================================================
   15. FORMAT RESULT
========================================================= */

function formatResult(value) {

    if (!Number.isFinite(value)) {

        return "—";

    }


    if (value === 0) {

        return "0";

    }


    const abs =
        Math.abs(value);


    if (
        abs >= 0.000001 &&
        abs < 1000000000
    ) {

        return Number(
            value.toPrecision(12)
        ).toString();

    }


    return value
        .toExponential(8)
        .replace(
            /(\.\d*?[1-9])0+e/,
            "$1e"
        );

}


/* =========================================================
   16. CONVERT VALUE
========================================================= */

function convertValue() {

    if (!currentConverter) return;


    const value =
        parseFloat(
            fromValue.value
        );


    if (Number.isNaN(value)) {

        toValue.value = "";

        formulaText.textContent =
            "Enter a valid number to see the result.";

        return;

    }


    const result =
        calculateConversion(
            value,
            fromUnit.value,
            toUnit.value
        );


    toValue.value =
        formatResult(result);


    updateFormula(
        value,
        result
    );

}


/* =========================================================
   17. UPDATE FORMULA
========================================================= */

function updateFormula(
    input,
    result
) {

    const from =
        formatUnitName(
            fromUnit.value
        );


    const to =
        formatUnitName(
            toUnit.value
        );


    formulaText.textContent =
        `${input} ${from} = ${formatResult(result)} ${to}`;

}


/* =========================================================
   18. LISTEN FOR VALUE CHANGES
========================================================= */

fromValue.addEventListener(
    "input",
    convertValue
);

fromUnit.addEventListener(
    "change",
    convertValue
);

toUnit.addEventListener(
    "change",
    convertValue
);


/* =========================================================
   19. SWAP UNITS
========================================================= */

swapButton.addEventListener(
    "click",
    () => {

        const oldFrom =
            fromUnit.value;

        fromUnit.value =
            toUnit.value;

        toUnit.value =
            oldFrom;


        const oldResult =
            toValue.value;


        if (oldResult !== "") {

            fromValue.value =
                oldResult;

        }


        convertValue();

    }
);


/* =========================================================
   20. COPY RESULT
========================================================= */

copyButton.addEventListener(
    "click",
    async () => {

        const value =
            toValue.value;


        if (!value) return;


        try {

            await navigator.clipboard.writeText(
                value
            );

            showToast(
                "Result copied!"
            );

        }

        catch {

            toValue.select();

            document.execCommand(
                "copy"
            );

            showToast(
                "Result copied!"
            );

        }

    }
);


/* =========================================================
   21. POPULAR UNITS
========================================================= */

function populatePopularUnits(
    units
) {

    popularUnits.innerHTML = "";


    units
        .slice(0, 8)
        .forEach(unit => {

            const button =
                document.createElement("button");


            button.className =
                "unit-chip";


            button.textContent =
                formatUnitName(unit);


            button.addEventListener(
                "click",
                () => {

                    fromUnit.value =
                        unit;

                    convertValue();

                }
            );


            popularUnits.appendChild(
                button
            );

        });

}


/* =========================================================
   22. TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 1800);

}


/* =========================================================
   23. DARK MODE
========================================================= */

function updateThemeIcon() {

    if (
        document.body.classList.contains(
            "dark"
        )
    ) {

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


    if (savedTheme === "dark") {

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
   24. MOBILE MENU
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
   25. CTRL + K SEARCH
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

            searchInput.focus();

            searchInput.select();

        }

    }
);


/* =========================================================
   26. ESCAPE SEARCH
========================================================= */

searchInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            searchInput.value = "";

            currentCategory =
                "all";


            document
                .querySelectorAll(".pill")
                .forEach(pill => {

                    pill.classList.remove(
                        "active"
                    );

                });


            document
                .querySelector(
                    '.pill[data-category="all"]'
                )
                ?.classList.add(
                    "active"
                );


            renderTools();

        }

    }
);


/* =========================================================
   27. FOOTER / NAV LINKS
========================================================= */

document
    .querySelectorAll(
        ".main-nav a, .footer-links a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".main-nav a"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                if (
                    link.closest(
                        ".main-nav"
                    )
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    });


/* =========================================================
   28. INITIALIZE
========================================================= */

loadTheme();

renderTools();


/* =========================================================
   29. DEFAULT ENTER KEY BEHAVIOR
========================================================= */

fromValue.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            convertValue();

        }

    }
);


/* =========================================================
   30. HANDLE BROWSER RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 760
        ) {

            const nav =
                document.querySelector(
                    ".main-nav"
                );


            nav.removeAttribute(
                "style"
            );


            nav.classList.remove(
                "mobile-open"
            );

        }

    }
);

/* =========================================================
   OPEN CONVERTER FROM URL
========================================================= */

function openConverterFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const converter =
        params.get("converter");


    if (
        converter &&
        converters[converter]
    ) {

        setTimeout(() => {

            openConverter(converter);

        }, 150);

    }

}


openConverterFromURL();