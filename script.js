/* ===========================================
   Mašnica — Demo Site Logic
   ===========================================
   All placeholder data is in the config object.
   Replace with real data when going to production.
   =========================================== */

var config = {
    name: "Mašnica",
    phone: "+381 60 000 0000",
    whatsapp: "381600000000",
    email: "info@example.com",
    facebook: "https://facebook.com/masnica.pancevo",
    instagram: "https://instagram.com/masnica.pancevo",

    categories: {
        "scrunchie": "Scrunchie",
        "hair-tie": "Gumice",
        "set": "Setovi"
    },

    products: [
        {
            id: "sc-01",
            name: "Satenski scrunchie — Klasik",
            category: "scrunchie",
            price: 550,
            image: "https://images.pexels.com/photos/6044144/pexels-photo-6044144.jpeg?auto=compress&cs=tinysrgb&w=640&h=800",
            alt: "Satenski scrunchie u toploj boji",
            desc: "Mekan satenski scrunchie koji ne ostavlja tragove na kosi. Savršen za svaki dan."
        },
        {
            id: "sc-02",
            name: "Pamučni scrunchie",
            category: "scrunchie",
            price: 450,
            image: "https://images.pexels.com/photos/7446425/pexels-photo-7446425.jpeg?auto=compress&cs=tinysrgb&w=640&h=800",
            alt: "Pamučni scrunchie u neutralnom tonu",
            desc: "Od 100% pamuka — idealan za svakodnevnu upotrebu i sportske aktivnosti."
        },
        {
            id: "sc-03",
            name: "Svečani scrunchie sa mašnom",
            category: "scrunchie",
            price: 700,
            image: "https://images.pexels.com/photos/7725645/pexels-photo-7725645.jpeg?auto=compress&cs=tinysrgb&w=640&h=800",
            alt: "Svečani scrunchie sa dekorativnom mašnom",
            desc: "Elegantan model sa mašnom — idealan za izlaske, proslave i poklone."
        },
        {
            id: "ht-01",
            name: "Tanke gumice — set od 3",
            category: "hair-tie",
            price: 400,
            image: "https://images.pexels.com/photos/9729956/pexels-photo-9729956.jpeg?auto=compress&cs=tinysrgb&w=640&h=800",
            alt: "Set od tri tanke gumice za kosu",
            desc: "Diskretne gumice u neutralnim tonovima. Izdržljive i nežne prema kosi."
        },
        {
            id: "ht-02",
            name: "Pamučne gumice — set od 5",
            category: "hair-tie",
            price: 550,
            image: "https://images.pexels.com/photos/6044135/pexels-photo-6044135.jpeg?auto=compress&cs=tinysrgb&w=640&h=800",
            alt: "Set pamučnih gumica za kosu u raznim bojama",
            desc: "Mekane pamučne gumice u raznim bojama. Idealne za svaki tip kose."
        },
        {
            id: "set-01",
            name: "Poklon set — 4 komada",
            category: "set",
            price: 1200,
            image: "https://images.pexels.com/photos/6954861/pexels-photo-6954861.jpeg?auto=compress&cs=tinysrgb&w=640&h=800",
            alt: "Poklon set gumica za kosu u kutiji",
            desc: "Kombinacija scrunchie-ja i gumica u poklon pakovanju. Savršen poklon za svaku priliku."
        }
    ]
};

var activeFilter = "all";

/* -------------------------------------------
   DOM References
   ------------------------------------------- */

function getElements() {
    return {
        grid: document.getElementById("product-grid"),
        filter: document.getElementById("category-filter"),
        form: document.getElementById("contact-form"),
        navToggle: document.getElementById("nav-toggle"),
        navMenu: document.getElementById("nav-menu"),
        contactChannels: document.getElementById("contact-channels"),
        socialLinks: document.getElementById("social-links")
    };
}

/* -------------------------------------------
   Helpers
   ------------------------------------------- */

function formatPrice(amount) {
    return amount.toLocaleString("sr-RS") + " din.";
}

function waLink(text) {
    return "https://wa.me/" + config.whatsapp + "?text=" + encodeURIComponent(text);
}

function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function productMessage(product) {
    return [
        "Zdravo! Zanima me ovaj proizvod:",
        "",
        "\u2022 " + product.name,
        "\u2022 Cena: " + formatPrice(product.price),
        "\u2022 Šifra: " + product.id,
        "",
        "Da li je dostupan i kako mogu da naručim?"
    ].join("\n");
}

/* -------------------------------------------
   Render Products
   ------------------------------------------- */

function renderProducts(els) {
    var products = activeFilter === "all"
        ? config.products
        : config.products.filter(function(p) { return p.category === activeFilter; });

    els.grid.innerHTML = "";

    if (!products.length) {
        els.grid.innerHTML = '<p class="status-msg">Nema proizvoda u ovoj kategoriji.</p>';
        return;
    }

    products.forEach(function(product) {
        var card = document.createElement("article");
        card.className = "product-card reveal";

        var categoryLabel = config.categories[product.category] || product.category;

        card.innerHTML =
            '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.alt) + '" loading="lazy" width="640" height="800">' +
            '<div class="product-body">' +
                '<h3>' + escapeHtml(product.name) + '</h3>' +
                '<div class="product-meta">' +
                    '<span class="badge">' + escapeHtml(categoryLabel) + '</span>' +
                    '<span class="price">' + formatPrice(product.price) + '</span>' +
                '</div>' +
                '<p class="product-desc">' + escapeHtml(product.desc) + '</p>' +
                '<a class="btn btn-primary btn-small" href="' + waLink(productMessage(product)) + '" target="_blank" rel="noopener">Naruči</a>' +
            '</div>';

        els.grid.appendChild(card);
    });

    observeRevealElements();
}

/* -------------------------------------------
   Contact Channels & Social Links
   ------------------------------------------- */

function renderContactChannels(els) {
    var channels = [
        { label: "WhatsApp", href: waLink("Zdravo! Imam pitanje u vezi gumica za kosu."), icon: "\uD83D\uDCAC" },
        { label: "Telefon: " + config.phone, href: "tel:" + config.phone.replace(/\s/g, ""), icon: "\uD83D\uDCDE" },
        { label: "Email: " + config.email, href: "mailto:" + config.email, icon: "\u2709\uFE0F" },
        { label: "Facebook", href: config.facebook, icon: "\uD83D\uDCD8" },
        { label: "Instagram", href: config.instagram, icon: "\uD83D\uDCF8" }
    ];

    els.contactChannels.innerHTML = "";

    channels.forEach(function(ch) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = ch.href;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = ch.icon + "  " + ch.label;
        li.appendChild(a);
        els.contactChannels.appendChild(li);
    });
}

function renderSocialLinks(els) {
    var links = [
        { label: "Facebook", href: config.facebook },
        { label: "Instagram", href: config.instagram },
        { label: "WhatsApp", href: waLink("Zdravo!") }
    ];

    els.socialLinks.innerHTML = "";

    links.forEach(function(link) {
        var a = document.createElement("a");
        a.href = link.href;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = link.label;
        els.socialLinks.appendChild(a);
    });
}

/* -------------------------------------------
   Category Filter
   ------------------------------------------- */

function populateFilter(els) {
    Object.keys(config.categories).forEach(function(key) {
        var option = document.createElement("option");
        option.value = key;
        option.textContent = config.categories[key];
        els.filter.appendChild(option);
    });
}

/* -------------------------------------------
   Form Submission
   ------------------------------------------- */

function handleFormSubmit(e, els) {
    e.preventDefault();

    var data = new FormData(els.form);
    var name = (data.get("name") || "").trim();
    var contact = (data.get("contact") || "").trim();
    var message = (data.get("message") || "").trim();

    if (!name || !contact || !message) {
        els.form.reportValidity();
        return;
    }

    var text = [
        "Zdravo! Upit sa sajta:",
        "",
        "Ime: " + name,
        "Kontakt: " + contact,
        "Poruka: " + message
    ].join("\n");

    window.open(waLink(text), "_blank", "noopener");
}

/* -------------------------------------------
   Mobile Menu
   ------------------------------------------- */

function toggleMenu(els) {
    var isOpen = els.navMenu.classList.toggle("open");
    els.navToggle.classList.toggle("active");
    els.navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMenuOnClick(els) {
    if (!els.navMenu) return;

    els.navMenu.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            els.navMenu.classList.remove("open");
            els.navToggle.classList.remove("active");
            els.navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* -------------------------------------------
   Scroll Reveal (IntersectionObserver)
   ------------------------------------------- */

var revealObserver = null;

function setupReveal() {
    if (!("IntersectionObserver" in window)) return;

    revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    observeRevealElements();
}

function observeRevealElements() {
    if (!revealObserver) return;

    document.querySelectorAll(".reveal:not(.visible)").forEach(function(el) {
        revealObserver.observe(el);
    });
}

function addRevealClasses() {
    var selectors = [
        ".section-header",
        ".step-card",
        ".delivery-card",
        ".about-content",
        ".about-image",
        ".contact-info",
        ".contact-form",
        ".hero-content",
        ".hero-image"
    ];

    document.querySelectorAll(selectors.join(", ")).forEach(function(el) {
        el.classList.add("reveal");
    });
}

/* -------------------------------------------
   Init
   ------------------------------------------- */

function init() {
    var els = getElements();

    // Mark JS as available for CSS reveal
    document.documentElement.classList.add("js");

    try {
        populateFilter(els);
        renderProducts(els);
        renderContactChannels(els);
        renderSocialLinks(els);

        if (els.filter) {
            els.filter.addEventListener("change", function() {
                activeFilter = els.filter.value;
                renderProducts(els);
            });
        }

        if (els.navToggle) {
            els.navToggle.addEventListener("click", function() {
                toggleMenu(els);
            });
        }

        if (els.form) {
            els.form.addEventListener("submit", function(e) {
                handleFormSubmit(e, els);
            });
        }

        closeMenuOnClick(els);

        addRevealClasses();
        setupReveal();

    } catch (err) {
        console.error("Greška pri inicijalizaciji:", err);
        if (els.grid) {
            els.grid.innerHTML = '<p class="status-msg">Došlo je do greške. Osveži stranicu.</p>';
        }
    }
}

document.addEventListener("DOMContentLoaded", init);
