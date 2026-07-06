// ========================================
// LEARN HTML & CSS - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('closeBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const backToTop = document.getElementById('backToTop');
    const mainContent = document.getElementById('mainContent');

    // ========================================
    // SIDEBAR NAVIGATION
    // ========================================

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Show target section, hide others
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                targetSection.classList.add('active');

                // Scroll to top of content
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
            }
        });
    });

    // Handle hash-based navigation (for direct links)
    function handleHashNavigation() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const targetLink = document.querySelector(`.nav-link[data-section="${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    }

    // Check hash on load
    handleHashNavigation();

    // ========================================
    // MOBILE MENU
    // ========================================

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close menu
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // ========================================
    // COPY CODE BUTTON
    // ========================================

    window.copyCode = function(button) {
        const codeBlock = button.closest('.code-block');
        const code = codeBlock.querySelector('code');
        const text = code.textContent;

        navigator.clipboard.writeText(text).then(() => {
            // Show success feedback
            button.textContent = 'Copied!';
            button.classList.add('copied');

            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================

    document.addEventListener('keydown', (e) => {
        // Escape to close sidebar on mobile
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // ========================================
    // RESPONSIVE HANDLING
    // ========================================

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('open');
            }
        }, 250);
    });

    // ========================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // ========================================

    // This is handled by the main nav-link click handler above
    // Only handle links that are NOT nav-links (e.g., anchor links within articles)
    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // INITIALIZATION
    // ========================================

    console.log('Learn HTML & CSS - Website Loaded');
});
