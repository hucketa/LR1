function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    const toggleButton =
        document.querySelector('.mobile-nav-toggle');
    mobileNav.classList.toggle('active');
    toggleButton.classList.toggle('active');
}
// Закрити меню при кліку на посилання
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