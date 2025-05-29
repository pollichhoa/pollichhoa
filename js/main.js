document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });

    // Language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    const htmlElement = document.documentElement;

    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        htmlElement.lang = savedLanguage;
        languageToggle.checked = savedLanguage === 'bn';
        updateContent(savedLanguage);
    }

    languageToggle.addEventListener('change', function() {
        const language = this.checked ? 'bn' : 'en';
        htmlElement.lang = language;
        localStorage.setItem('language', language);
        updateContent(language);
    });

    function updateContent(language) {
        // Update all elements with data-en and data-bn attributes
        document.querySelectorAll('[data-en][data-bn]').forEach(element => {
            element.textContent = element.getAttribute(`data-${language}`);
        });

        // Update page title
        const titleElement = document.querySelector('title');
        if (titleElement && titleElement.hasAttribute(`data-${language}`)) {
            titleElement.textContent = titleElement.getAttribute(`data-${language}`);
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                navLinks.classList.remove('active');
            }
        });
    });

    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all product cards and features
    document.querySelectorAll('.product-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}); 