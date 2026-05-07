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