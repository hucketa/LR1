function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    const toggleButton =
        document.querySelector('.mobile-nav-toggle');
    mobileNav.classList.toggle('active');
    toggleButton.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
    const mobileNavLinks =
        document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileNav = document.getElementById('mobileNav');
            const toggleButton = document.querySelector('.mobile-nav-toggle');
            mobileNav.classList.remove('active');
            toggleButton.classList.remove('active');
        });
    });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const filter = button.dataset.filter;
        portfolioItems.forEach(item => {
            if (
                filter === "all" ||
                item.dataset.category.includes(filter)
            ) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// ===============================
// Динамічна зміна Grid Layout
// ===============================

const gridDemo = document.querySelector('.basic-grid');

if (gridDemo) {
    const controls = document.createElement('div');

    controls.className = 'grid-controls';

    controls.innerHTML = `
        <button onclick="changeGridCols(2)">2 колонки</button>
        <button onclick="changeGridCols(3)">3 колонки</button>
        <button onclick="changeGridCols(4)">4 колонки</button>
        <button onclick="changeGridCols(5)">5 колонок</button>
    `;

    gridDemo.parentNode.insertBefore(controls, gridDemo);
}

function changeGridCols(cols) {

    const grid =
        document.querySelector('.basic-grid');

    if (grid) {

        grid.style.gridTemplateColumns =
            `repeat(${cols}, 1fr)`;
    }
}

// ===============================
// Інтерактивна зміна Grid Gap
// ===============================

const gapDemo = document.querySelector('.gap-grid');

if (gapDemo) {
    const gapControl = document.createElement('div');

    gapControl.className = 'gap-control';

    gapControl.innerHTML = `
        <label>
            Grid Gap:
            <span id="gapValue">30px</span>
        </label>

        <input
            type="range"
            min="0"
            max="50"
            value="30"
            oninput="changeGridGap(this.value)"
        >
    `;

    gapDemo.parentNode.insertBefore(gapControl, gapDemo);
}


// ===============================
// Анімація при скролі
// ===============================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);


// ===============================
// Спостереження за елементами
// ===============================

document
    .querySelectorAll(
        '.feature-card, .portfolio-item, .price-card'
    )
    .forEach((el) => {
        observer.observe(el);
    });


// ===============================
// Функції для Grid Controls
// ===============================

function changeGridCols(cols) {
    const grid = document.querySelector('.basic-grid');

    if (grid) {
        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    }
}

function changeGridGap(value) {
    const grid = document.querySelector('.gap-grid');
    const valueDisplay = document.getElementById('gapValue');

    if (grid && valueDisplay) {
        grid.style.gap = `${value}px`;
        valueDisplay.textContent = `${value}px`;
    }
}


// ===============================
// Masonry Layout (CSS Grid)
// ===============================

function initMasonry() {
    const masonry = document.querySelector('.masonry-container');

    if (!masonry) return;

    const items = masonry.querySelectorAll('.masonry-item');

    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}


// ===============================
// Lightbox для галереї
// ===============================

function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');

    lightbox.className = 'lightbox';

    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span
                class="lightbox-close"
                onclick="closeLightbox()"
            >
                &times;
            </span>

            <img
                src="${imageSrc}"
                alt="Full size image"
            >
        </div>
    `;

    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');

    if (lightbox) {
        lightbox.remove();
    }
}


// ===============================
// Підключення Lightbox до галереї
// ===============================

document
    .querySelectorAll('.masonry-item img, .portfolio-item img')
    .forEach((img) => {

        img.style.cursor = 'pointer';

        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });


// ===============================
// Ініціалізація
// ===============================

initMasonry();