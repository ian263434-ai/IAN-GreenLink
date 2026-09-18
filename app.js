/* =========================================
   IAN GREENLINK - MAIN APPLICATION
   ========================================= */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");

        menuToggle.textContent =
            navMenu.classList.contains("open") ? "✕" : "☰";
    });


    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");
            menuToggle.textContent = "☰";

        });

    });
}


/* ================= NAVBAR SCROLL ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ================= COUNTERS ================= */

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target = Number(counter.dataset.target);

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 45));

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        counter.textContent = current;

    }, 25);
}


const counterObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: .7
    }
);


counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* ================= GREENLINK STORAGE ================= */

/*
   These are sample system records for the prototype.
   Later stages will replace this with the actual reporting
   and activity modules.
*/

function initializeGreenLinkData() {

    if (!localStorage.getItem("greenlink_reports")) {

        const sampleReports = [
            {
                id: "GL-001",
                type: "Plastic",
                location: "School compound",
                description: "Plastic waste near the main gate",
                date: "2026-09-01",
                status: "Resolved"
            },
            {
                id: "GL-002",
                type: "Organic",
                location: "Community drainage",
                description: "Organic waste blocking drainage",
                date: "2026-09-04",
                status: "Pending"
            },
            {
                id: "GL-003",
                type: "Paper",
                location: "School library area",
                description: "Paper waste requiring collection",
                date: "2026-09-07",
                status: "Resolved"
            }
        ];

        localStorage.setItem(
            "greenlink_reports",
            JSON.stringify(sampleReports)
        );
    }


    if (!localStorage.getItem("greenlink_activities")) {

        const sampleActivities = [
            {
                id: "ACT-001",
                name: "School Clean-Up",
                location: "School compound",
                date: "2026-08-20",
                participants: 35,
                trees: 5
            },
            {
                id: "ACT-002",
                name: "Tree Planting",
                location: "Community field",
                date: "2026-08-28",
                participants: 24,
                trees: 18
            }
        ];

        localStorage.setItem(
            "greenlink_activities",
            JSON.stringify(sampleActivities)
        );
    }

}


initializeGreenLinkData();


/* ================= HOMEPAGE STATISTICS ================= */

function updateHomepageStats() {

    const reports =
        JSON.parse(
            localStorage.getItem("greenlink_reports")
        ) || [];

    const activities =
        JSON.parse(
            localStorage.getItem("greenlink_activities")
        ) || [];


    const totalReports = reports.length;

    const resolvedReports =
        reports.filter(
            report =>
                report.status.toLowerCase() === "resolved"
        ).length;


    const resolvedPercentage =
        totalReports === 0
            ? 0
            : Math.round(
                (resolvedReports / totalReports) * 100
            );


    const totalTrees =
        activities.reduce(
            (total, activity) =>
                total + Number(activity.trees || 0),
            0
        );


    const reportElement =
        document.getElementById("reportCount");

    const treeElement =
        document.getElementById("treeCount");

    const activityElement =
        document.getElementById("activityCount");

    const resolvedElement =
        document.getElementById("resolvedCount");


    if (reportElement)
        reportElement.textContent = totalReports;

    if (treeElement)
        treeElement.textContent = totalTrees;

    if (activityElement)
        activityElement.textContent = activities.length;

    if (resolvedElement)
        resolvedElement.textContent =
            resolvedPercentage + "%";
}


updateHomepageStats();


/* ================= BUTTON MICRO INTERACTION ================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.97)";

        setTimeout(() => {
            button.style.transform = "";
        }, 120);

    });

});


/* ================= CONSOLE ================= */

console.log(
    "%cIAN GreenLink",
    "font-size:22px;font-weight:bold;color:#18a558;"
);

console.log(
    "Connect. Act. Go Green. 🌿"
);