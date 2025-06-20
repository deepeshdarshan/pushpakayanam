const pageData = {
    index: {
        title: "index"
    },
    venue: {
        title: "VENUE",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Venue", href: "#" }
        ]
    },
    programs: {
        title: "PROGRAMS",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Programs", href: "#" }
        ]
    },
    logo: {
        title: "ലോഗോ പ്രകാശനം",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "ലോഗോ പ്രകാശനം", href: "#" }
        ]
    },
    vishu_contest: {
        title: "വിഷു ഫോട്ടോഗ്രാഫി മത്സരം",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "വിഷു ഫോട്ടോഗ്രാഫി മത്സരം", href: "#" }
        ]
    },
    orgcom_announcement: {
        title: "സ്വാഗതസംഘ രൂപീകരണം",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "സ്വാഗതസംഘ രൂപീകരണം", href: "#" }
        ]
    },
    orgcom_announcement: {
        title: "സ്വാഗതസംഘ രൂപീകരണം",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "സ്വാഗതസംഘ രൂപീകരണം", href: "#" }
        ]
    },
    naming_contest: {
        title: "നാമനിർദ്ദേശ മത്സരം",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "നാമനിർദ്ദേശ മത്സരം", href: "#" }
        ]
    },
    walkathon: {
        title: "Walkathon",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "Walkathon", href: "#" }
        ]
    },
    reels_contest: {
        title: "റീൽസ് മത്സരം",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "റീൽസ് മത്സരം", href: "#" }
        ]
    },
    team: {
        title: "Our team",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "Our team", href: "#" }
        ]
    },
    contact_us: {
        title: "Contact us",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "Contact us", href: "#" }
        ]
    },
    orgcom_gallery: {
        title: "സ്വാഗതസംഘ രൂപീകരണം",
        breadcrumbs: [
            { name: "Home", href: "/index.html" },
            { name: "Announcements", href: "#" },
            { name: "സ്വാഗതസംഘ രൂപീകരണം", href: "#" }
        ]
    }
}

const metas = [
    {
        charset: "UTF-8",
    },
    {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
    },
    {
        name: "keywords",
        content: "പുഷ്പകായനം 2025",
    },
    {
        name: "description",
        content: "പുഷ്പകായനം 2025| 57-ാം ദേശീയ സമ്മേളനം | ശ്രീ പുഷ്പകബ്രാഹ്മണ സേവാ സംഘം",
    },
];

const headerScripts = [
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js",
    "/lib/easing/easing.min.js",
    "/lib/waypoints/waypoints.min.js",
    "/lib/owlcarousel/owl.carousel.min.js",
    "/js/main.js"
];

const links = [
    {
        rel: "icon",
        href: "/img/favicon.ico",
        type: "image/x-icon",
    },
    {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
    },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "true",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap",
    },
    {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css",
    },
    {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css",
    },
    {
        rel: "stylesheet",
        href: "/lib/owlcarousel/assets/owl.carousel.min.css",
    },
    {
        rel: "stylesheet",
        href: "/css/bootstrap.min.css",
    },
    {
        rel: "stylesheet",
        href: "/css/style.css",
    },
];

async function init(pageId) {
    loadMeta();
    loadHeadLinks();
    loadHeader();
    loadTitle();
    loadPageHeader(pageId);
    loadFooter();
    const module = await import('/js/visit-counter.js');
    module.initVisitCounter();
}

function loadHeader(loadScripts = true) {
    fetch("/main/partials/header.html")
        .then(res => {
            if (!res.ok) throw new Error("404");
            return res.text();
        })
        .then(html => {
            const container = document.getElementById("header-container");
            container.innerHTML = html;
            if (loadScripts) {
                loadHeaderScripts();
            }
        })
        .catch(() => {
            console.error("Error loading header:", err);
            const container = document.getElementById("header-container");
            if (container) container.innerHTML = "Header not found.";
        });
}

function loadFooter() {
    fetch("/main/partials/footer.html")
        .then(res => {
            if (!res.ok) throw new Error("404");
            return res.text();
        })
        .then(html => {
            const container = document.getElementById("footer-container");
            container.innerHTML = html;
        })
        .catch(() => {
            console.error("Error loading footer:", err);
            const container = document.getElementById("footer-container");
            if (container) container.innerHTML = "Footer not found.";
        });
}

function loadHeaderScripts() {
    headerScripts.forEach(src => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        document.head.appendChild(script);
    });
}

function loadHeadLinks() {
    links.forEach((attrs) => {
        const link = document.createElement("link");
        for (let [key, value] of Object.entries(attrs)) {
            link.setAttribute(key, value);
        }
        document.head.appendChild(link);
    });
}

function loadMeta() {
    metas.forEach((attrs) => {
        const meta = document.createElement("meta");
        for (let [key, value] of Object.entries(attrs)) {
            meta.setAttribute(key, value);
        }

        // Insert charset meta as the first head element
        if (attrs.charset) {
            document.head.insertBefore(meta, document.head.firstChild);
        } else {
            document.head.appendChild(meta);
        }
    });
}

function loadPageHeader(pageId) {
    fetch("/main/partials/page-header.html")
        .then(res => {
            if (!res.ok) throw new Error(`Page header fetch failed: ${res.status}`);
            return res.text();
        })
        .then(html => {
            const container = document.getElementById("page-header-container");
            container.innerHTML = html;
            const page = pageData[pageId];
            const pageHeader = document.getElementById("page-header");
            if (page.title === "index") {
                pageHeader.style.display = "none";
                requestAnimationFrame(() => loadCarousels());
                return;
            }
            else {
                pageHeader.style.display = "block";
                document.getElementById("page-title").textContent = page.title;
                const breadcrumbContainer = document.getElementById("breadcrumb-container");
                const breadcrumbs = page.breadcrumbs;
                if (breadcrumbContainer && breadcrumbs.length) {
                    breadcrumbContainer.innerHTML = breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        const href = item.href || "#";
                        const name = item.name || "Untitled";
                        return isLast
                            ? `<a href="${href}">${name}</a>`
                            : `<a href="${href}">${name}</a><i class="far fa-square text-primary px-2"></i>`;
                    }).join('');
                }
            }
        })
        .catch(err => {
            console.error("Error loading page header:", err);
            const container = document.getElementById("page-header");
            if (container) container.innerHTML = "Page header not available.";
        });
}

function loadTitle() {
    const title = document.createElement("title");
    title.id = "title-txt";
    title.textContent = "പുഷ്പകായനം 2025";
    document.head.appendChild(title);
}

function loadCarousels() {
    $(document).ready(function () {
        try {
            const $testimonial = $('#testimonial-carousel');
            const $header = $('#header-carousel');

            if ($testimonial.length > 0) {
                $testimonial.owlCarousel({
                    autoplay: false,
                    smartSpeed: 500,
                    items: 1,
                    dots: false,
                    loop: true,
                    nav: true,
                    navText: [
                        '<i class="bi bi-arrow-left"></i>',
                        '<i class="bi bi-arrow-right"></i>'
                    ],
                });
            }

            if ($header.length > 0) {
                $header.owlCarousel({
                    autoplay: true,
                    smartSpeed: 500,
                    items: 1,
                    dots: false,
                    loop: true,
                    nav: true,
                    navText: [
                        '<i class="bi bi-arrow-left"></i>',
                        '<i class="bi bi-arrow-right"></i>'
                    ],
                });
            }
        } catch (err) {
            alert(e);
            console.error("Error initializing carousels:", err);
        }
    });
}
