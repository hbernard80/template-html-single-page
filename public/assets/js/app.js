document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('#main-nav');

    function updateHeaderOnScroll() {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 10);
    }

    function closeMenu() {
        if (!toggle || !nav) return;
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
    }

    function openMenu() {
        if (!toggle || !nav) return;
        nav.classList.add('is-open');
        toggle.classList.add('is-active');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Fermer le menu');
    }

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const isOpen = nav.classList.contains('is-open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function (event) {
            const clickedInsideMenu = nav.contains(event.target);
            const clickedToggle = toggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll);
});