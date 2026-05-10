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
                item.style.display = "block";
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
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });

}, observerOptions);

// Спостерігаємо за елементами
document
    .querySelectorAll(
        '.feature-card, .portfolio-item, .price-card'
    )
    .forEach(el => {
        observer.observe(el);
    });


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

function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Відображення поточного breakpoint
function updateBreakpointInfo() {
    const width = window.innerWidth;
    const breakpointValue = document.getElementById('currentBreakpoint');
    const screenWidth = document.getElementById('screenWidth');
    if (breakpointValue && screenWidth) {
        screenWidth.textContent = width + 'px';
        if (width <= 480) {
            breakpointValue.textContent = 'Mobile';
            breakpointValue.style.color = '#e74c3c';
        } else if (width <= 768) {
            breakpointValue.textContent = 'Tablet';
            breakpointValue.style.color = '#f39c12';
        } else if (width <= 1024) {
            breakpointValue.textContent = 'Desktop';
            breakpointValue.style.color = '#3498db';
        } else {
            breakpointValue.textContent = 'Large Desktop';
            breakpointValue.style.color = '#9b59b6';
        }
    }
}

// Виклик при завантаженні та зміні розміру вікна
window.addEventListener('load', updateBreakpointInfo);
window.addEventListener('resize', updateBreakpointInfo);
// Функція для DevTools

function openDevTools() {
    alert('Натисніть F12 або:\n\n' +
        'Windows/Linux: Ctrl + Shift + I\n' +
        'Mac: Cmd + Option + I\n\n' +
        'Потім оберіть Device Toolbar (Ctrl+Shift+M або Cmd+Shift+M)');
}

// Виявлення типу пристрою
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
    if (isTablet) {
        return 'Tablet';
    } else if (isMobile) {
        return 'Mobile';
    } else {
        return 'Desktop';
    }
}

// Додавання класу до body на основі пристрою
document.addEventListener('DOMContentLoaded', function () {
    const device = detectDevice();
    document.body.classList.add('device-' + device.toLowerCase());
    // Виведення інформації про пристрій (для демонстрації)
    console.log('Device Type:', device);
    console.log('Screen Width:', window.innerWidth);
    console.log('Screen Height:', window.innerHeight);
    console.log('User Agent:', navigator.userAgent);
});

// Responsive Navigation - закриття меню при кліку на посилання
document.querySelectorAll('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Lazy Loading для зображень
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Orientation Change Handler
window.addEventListener('orientationchange', function () {
    setTimeout(updateBreakpointInfo, 100);
    console.log('Orientation changed to:', screen.orientation ? screen.orientation.type : 'unknown');
});

// Touch Events для мобільних пристроїв
let touchStartX = 0;
let touchEndX = 0;
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Свайп вправо - відкрити меню
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && !mobileMenu.classList.contains('active')) {
                mobileMenu.classList.add('active');
                hamburger.classList.add('active');
            }
        } else {
            // Свайп вліво - закрити меню
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Progress tracking for checklist
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.checklist input[type="checkbox"]:checked').length;
        const percentage = Math.round((checked / total) * 100);
        if (progressBar && progressPercent) {
            progressBar.style.width = percentage + '%';
            progressPercent.textContent = percentage + '%';
        }
    }
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    updateProgress();
});

window.addEventListener('load', () => {
    const loader =
        document.querySelector('.loading-demo');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');

        }, 800);
    }
});

   function changeVariableGrid(cols) {
    document.documentElement.style.setProperty(
        '--dynamic-columns',
        `repeat(${cols}, 1fr)`
    );}