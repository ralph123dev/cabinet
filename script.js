// ===================================
// DOM ELEMENTS
// ===================================
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const navLinkElements = document.querySelectorAll('.nav-link');

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking a link
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLL & ACTIVE NAV LINKS
// ===================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// REVEAL ANIMATIONS ON SCROLL
// ===================================
function reveal() {
    const reveals = document.querySelectorAll('.mission-card, .expertise-card, .offre-card, .processus-card, .step-card, .valeur-item, .highlight-card');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// ===================================
// 3D TILT EFFECT FOR CARDS
// ===================================
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===================================
// PARALLAX EFFECT FOR IMAGES
// ===================================
const parallaxImages = document.querySelectorAll('.parallax-image');

window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
        const speed = 0.5;
        const rect = img.getBoundingClientRect();
        const scrolled = window.pageYOffset;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(rect.top * speed);
            img.style.transform = `translateY(${yPos}px) scale(1.1)`;
        }
    });
});

// ===================================
// ANIMATED COUNTERS
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : element.textContent.includes('+') ? '+' : element.textContent.includes('x') ? 'x' : '');
            clearInterval(timer);
        } else {
            const currentValue = Math.floor(start);
            const suffix = element.textContent.match(/[%+x]/)?.[0] || '';
            element.textContent = currentValue + suffix;
        }
    }, 16);
}

// Trigger counters when stats section is visible
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

window.addEventListener('scroll', () => {
    if (countersAnimated) return;

    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            countersAnimated = true;
            const text = stat.textContent;
            const number = parseInt(text);
            if (!isNaN(number)) {
                stat.textContent = '0';
                animateCounter(stat, number);
            }
        }
    });
});

// ===================================
// GRADIENT ORB MOUSE TRACKING
// ===================================
const gradientOrbs = document.querySelectorAll('.gradient-orb');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    gradientOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - window.innerWidth / 2) * speed;
        const y = (mouseY - window.innerHeight / 2) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===================================
// SMOOTH SCROLL BEHAVIOR
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.mission-card, .expertise-card, .offre-card, .step-card, .valeur-item, .highlight-card').forEach(card => {
    card.classList.add('reveal');
    observer.observe(card);
});

// ===================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ===================================
let cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    // Keep trail length limited
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===================================
// PAGE LOAD ANIMATIONS
// ===================================
window.addEventListener('load', () => {
    // Fade in body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);

    // Trigger initial reveal
    reveal();
});

// ===================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ===================================
function createScrollTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px) scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
}

createScrollTopButton();

// ===================================
// CARD FLOATING ANIMATIONS
// ===================================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Random animation delay and duration
    const delay = Math.random() * 2;
    const duration = 4 + Math.random() * 2;

    card.style.animationDelay = `${delay}s`;
    card.style.animationDuration = `${duration}s`;
});

// ===================================
// GRADIENT TEXT ANIMATION
// ===================================
const gradientTexts = document.querySelectorAll('.gradient-text');

gradientTexts.forEach(text => {
    let angle = 0;
    setInterval(() => {
        angle = (angle + 1) % 360;
        text.style.background = `linear-gradient(${angle}deg, #667eea, #764ba2, #f093fb)`;
        text.style.webkitBackgroundClip = 'text';
        text.style.webkitTextFillColor = 'transparent';
        text.style.backgroundClip = 'text';
    }, 50);
});

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mouse events
function throttle(func, limit = 16) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply optimizations
window.addEventListener('scroll', debounce(reveal, 10));
window.addEventListener('scroll', debounce(updateActiveLink, 10));

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🚀 Bienvenue sur BIKEI ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
console.log('%cCabinet de Clarté Stratégique & d\'Orientation Entrepreneuriale', 'color: #667eea; font-size: 14px; font-weight: bold;');
console.log('%cSite développé avec HTML, CSS et JavaScript vanilla', 'color: #9ca3af; font-size: 12px;');

// Wait for the DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Select the menu toggle button and navigation links
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Check if elements exist (to avoid errors if HTML is not set up)
    if (menuToggle && navLinks) {
        // Add click event listener to the toggle button
        menuToggle.addEventListener('click', function () {
            // Toggle the 'active' class on the toggle button (for animation)
            menuToggle.classList.toggle('active');
            // Toggle the 'active' class on the nav links (to show/hide the menu)
            navLinks.classList.toggle('active');
        });
    }
});
