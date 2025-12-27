// Main JavaScript - Core Functionality

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const body = document.body;

function toggleMobileMenu() {
    const isActive = navMenu.classList.contains('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open', !isActive);
    
    const icon = navToggle.querySelector('i');
    icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    body.classList.remove('menu-open');
    const icon = navToggle.querySelector('i');
    icon.className = 'fas fa-bars';
}

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navToggle.contains(e.target) && 
        !navMenu.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking on a nav link
if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
        // Don't close menu for account dropdown links or account menu parent link
        if (!link.closest('.account-dropdown') && !link.closest('.account-menu')) {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        }
    });
    
    // Close mobile menu when clicking on account dropdown links
    navMenu.querySelectorAll('.account-dropdown a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

// Account Dropdown Menu
const accountMenus = document.querySelectorAll('.account-menu');

accountMenus.forEach(menu => {
    const menuLink = menu.querySelector('a');
    const dropdown = menu.querySelector('.account-dropdown');
    
    if (menuLink && dropdown) {
        menuLink.addEventListener('click', (e) => {
            const isMobile = window.innerWidth <= 1024;
            
            if (isMobile) {
                // Mobile/Tablet: click to toggle
                e.preventDefault();
                e.stopPropagation();
                // Close other account menus
                accountMenus.forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.classList.remove('active');
                    }
                });
                // Toggle current menu
                menu.classList.toggle('active');
            } else {
                // Desktop: prevent default on hover (handled by CSS)
                if (!e.target.closest('.account-dropdown')) {
                    e.preventDefault();
                }
            }
        });
    }
});

// Close dropdown when clicking outside (mobile/tablet)
document.addEventListener('click', (e) => {
    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile) {
        if (!e.target.closest('.account-menu')) {
            accountMenus.forEach(menu => {
                menu.classList.remove('active');
            });
        }
    }
});

// Navbar scroll effect
const mainNav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        mainNav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        mainNav.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.research-card, .stat-card, .news-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Accessibility Panel
const accessibilityToggle = document.createElement('button');
accessibilityToggle.className = 'accessibility-toggle';
accessibilityToggle.innerHTML = '<i class="fas fa-universal-access"></i>';
accessibilityToggle.setAttribute('aria-label', 'Accessibility Options');
document.body.appendChild(accessibilityToggle);

const accessibilityPanel = document.createElement('div');
accessibilityPanel.className = 'accessibility-panel';
accessibilityPanel.innerHTML = `
    <h4>Accessibility Options</h4>
    <div style="margin-top: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem;">
            Font Size: 
            <input type="range" id="fontSize" min="14" max="24" value="16" style="width: 100%;">
        </label>
        <label style="display: block; margin-bottom: 0.5rem;">
            Contrast: 
            <input type="range" id="contrast" min="1" max="2" step="0.1" value="1" style="width: 100%;">
        </label>
        <button id="resetAccessibility" style="margin-top: 1rem; padding: 0.5rem 1rem; width: 100%;">Reset</button>
    </div>
`;

document.body.appendChild(accessibilityPanel);

accessibilityToggle.addEventListener('click', () => {
    accessibilityPanel.classList.toggle('active');
});

const fontSizeSlider = document.getElementById('fontSize');
const contrastSlider = document.getElementById('contrast');
const resetBtn = document.getElementById('resetAccessibility');

fontSizeSlider.addEventListener('input', (e) => {
    document.body.style.fontSize = e.target.value + 'px';
    localStorage.setItem('fontSize', e.target.value);
});

contrastSlider.addEventListener('input', (e) => {
    document.body.style.filter = `contrast(${e.target.value})`;
    localStorage.setItem('contrast', e.target.value);
});

resetBtn.addEventListener('click', () => {
    fontSizeSlider.value = 16;
    contrastSlider.value = 1;
    document.body.style.fontSize = '';
    document.body.style.filter = '';
    localStorage.removeItem('fontSize');
    localStorage.removeItem('contrast');
});

// Load saved accessibility settings
const savedFontSize = localStorage.getItem('fontSize');
const savedContrast = localStorage.getItem('contrast');
if (savedFontSize) {
    fontSizeSlider.value = savedFontSize;
    document.body.style.fontSize = savedFontSize + 'px';
}
if (savedContrast) {
    contrastSlider.value = savedContrast;
    document.body.style.filter = `contrast(${savedContrast})`;
}

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

