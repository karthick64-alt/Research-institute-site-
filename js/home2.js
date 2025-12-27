// Home2 Page JavaScript - Modern Interactions

// Parallax Effect for Hero Section
const parallaxLayers = document.querySelectorAll('.parallax-layer');
const heroParallax = document.querySelector('.hero-parallax');

if (heroParallax && parallaxLayers.length > 0) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        parallaxLayers.forEach((layer, index) => {
            const speed = layer.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Animated Counter for Stats
const statValues = document.querySelectorAll('.stat-value');
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    // Check if '+' symbol exists in the element
    const hasPlus = element.querySelector('.stat-plus') !== null;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            const number = Math.floor(current);
            if (hasPlus) {
                element.innerHTML = number + '<span class="stat-plus">+</span>';
            } else {
                element.textContent = number;
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (hasPlus) {
                element.innerHTML = target + '<span class="stat-plus">+</span>';
            } else {
                element.textContent = target;
            }
        }
    };
    
    updateCounter();
};

// Intersection Observer for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(stat => {
    statsObserver.observe(stat);
});

// Testimonials Carousel
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const carouselDots = document.querySelectorAll('.carousel-dots .dot');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}

// Auto-rotate carousel
if (testimonialSlides.length > 0) {
    setInterval(nextSlide, 5000);
    
    // Dot navigation
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.innovation-card, .timeline-item-v2, .project-card-v2');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});

// Mouse move parallax for hero content
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const heroContent = document.querySelector('.hero-content-v2');
        if (heroContent) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroContent.style.transform = `translate3d(${x}px, ${y}px, 0)`;
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
        mainNav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        mainNav.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        mainNav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

[data-theme="dark"] && window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const mainNav = document.getElementById('mainNav');
    
    if (currentScroll > 100) {
        mainNav.style.background = 'rgba(17, 24, 39, 0.98)';
    } else {
        mainNav.style.background = 'rgba(17, 24, 39, 0.95)';
    }
});


