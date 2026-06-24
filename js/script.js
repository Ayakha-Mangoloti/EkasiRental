/* ================= FILTER FUNCTION (LIVE) ================= */

function filterCards() {

    let locationInput = document.getElementById("location");
    let typeInput = document.getElementById("type");
    let priceInput = document.getElementById("price");

    let location = locationInput ? locationInput.value.toLowerCase() : "";
    let type = typeInput ? typeInput.value.toLowerCase() : "";
    let price = priceInput ? priceInput.value : "";

    let allCards = document.querySelectorAll(".card");
    let visibleCount = 0;

    allCards.forEach(card => {

        let cardLocation = card.dataset.location.toLowerCase();
        let cardType = card.dataset.type.toLowerCase();
        let cardPrice = parseInt(card.dataset.price);

        let matchLocation = location === "" || cardLocation.includes(location);
        let matchType = type === "" || cardType === type;
        let matchPrice = price === "" || cardPrice <= parseInt(price);

        if (matchLocation && matchType && matchPrice) {
            card.classList.remove("hide");
            card.classList.add("show");
            visibleCount++;
        } else {
            card.classList.remove("show");
            card.classList.add("hide");
        }
    });

    const noResults = document.getElementById("noResults");

    if (noResults) {
        noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
}

/* ================= LIVE FILTER EVENTS ================= */

const locationEl = document.getElementById("location");
const typeEl = document.getElementById("type");
const priceEl = document.getElementById("price");

if (locationEl) locationEl.addEventListener("input", filterCards);
if (typeEl) typeEl.addEventListener("change", filterCards);
if (priceEl) priceEl.addEventListener("input", filterCards);

/* ================= LIGHTBOX ================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");

if (lightbox && lightboxImg && closeBtn) {

    const images = document.querySelectorAll(".card img");

    images.forEach(img => {
        img.addEventListener("click", function () {
            lightbox.style.display = "flex";
            lightboxImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

/* ================= SORT FUNCTION ================= */

const sortBtn = document.getElementById("sortLowHigh");
const grid = document.querySelector(".grid");

if (sortBtn && grid) {

    sortBtn.addEventListener("click", function () {

        let cardsArray = Array.from(document.querySelectorAll(".card"));

        cardsArray.sort((a, b) => {
            return a.dataset.price - b.dataset.price;
        });

        grid.innerHTML = "";

        cardsArray.forEach(card => {
            grid.appendChild(card);
        });
    });
}

/* ================= RESET FILTERS ================= */

const resetBtn = document.getElementById("resetFilters");

if (resetBtn) {
    resetBtn.addEventListener("click", function () {

        const location = document.getElementById("location");
        const type = document.getElementById("type");
        const price = document.getElementById("price");

        if (location) location.value = "";
        if (type) type.value = "";
        if (price) price.value = "";

        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("hide");
            card.classList.add("show");
        });

        const noResults = document.getElementById("noResults");
        if (noResults) noResults.style.display = "none";
    });
}

/* ================= INIT STATE ================= */

document.querySelectorAll(".card").forEach(card => {
    card.classList.add("show");
});

/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        formMessage.textContent = "";
        formMessage.style.color = "red";

        if (!name.value || !email.value || !subject.value || !message.value) {
            formMessage.textContent = "⚠️ Please fill in all fields.";
            return;
        }

        if (!emailPattern.test(email.value)) {
            formMessage.textContent = "⚠️ Please enter a valid email address.";
            return;
        }

        if (message.value.length < 10) {
            formMessage.textContent = "⚠️ Message must be at least 10 characters.";
            return;
        }

        formMessage.style.color = "green";
        formMessage.textContent = "✅ Message sent successfully! We will respond soon.";

        contactForm.reset();
    });
}


