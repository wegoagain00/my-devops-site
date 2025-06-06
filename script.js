// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Header scroll effects
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < bottom) {
            navLinkItems.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active'); // The .active class is still added, but now has no specific styles from the removed rules
            }
        }
    });
}

// Intersection Observer for fade-in animations
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

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill item animations with stagger effect
document.querySelectorAll('.skill-item').forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;

    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });

    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Particle system for hero section
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        // Create particles periodically
        setInterval(() => this.createParticle(), 500);
        this.animate();
    }

    createParticle() {
        if (this.particles.length > 20) return; // Limit particles

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        this.hero.appendChild(particle);
        this.particles.push({
            element: particle,
            x: parseFloat(particle.style.left),
            y: 100,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.6 + 0.2,
            drift: (Math.random() - 0.5) * 0.5
        });
    }

    animate() {
        this.particles.forEach((particle, index) => {
            particle.y -= particle.speed;
            particle.x += particle.drift;
            particle.opacity -= 0.005;

            particle.element.style.top = particle.y + '%';
            particle.element.style.left = particle.x + '%';
            particle.element.style.opacity = particle.opacity;

            // Remove particle when it's off screen or invisible
            if (particle.y < -10 || particle.opacity <= 0) {
                particle.element.remove();
                this.particles.splice(index, 1);
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
new ParticleSystem();

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #0ea5e9, #f59e0b);
    transition: width 0.1s ease;
    z-index: 9999;
    box-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = Math.min(scrolled, 100) + '%';
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero p');

        if (heroTitle && heroSubtitle) {
            heroTitle.style.opacity = '0';
            // Remove the opacity change for subtitle to keep it static
            // heroSubtitle.style.opacity = '0';

            setTimeout(() => {
                typeWriter(heroTitle, 'DevOps Engineer', 150);
                // Remove the subtitle typing effect
                // setTimeout(() => {
                //     typeWriter(heroSubtitle, 'Building scalable infrastructure and automating the future', 50);
                // }, 2000);
            }, 1000);
        }
    }, 500);
});

// Enhanced scroll animations with different effects
const scrollAnimations = {
    slideInLeft: (element) => {
        element.style.transform = 'translateX(-50px)';
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, 100);
    },

    slideInRight: (element) => {
        element.style.transform = 'translateX(50px)';
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, 100);
    },

    scaleIn: (element) => {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 100);
    }
};

// Apply different animations to different elements
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;

            if (element.classList.contains('about-text')) {
                scrollAnimations.slideInLeft(element);
            } else if (element.classList.contains('skills-grid')) {
                scrollAnimations.slideInRight(element);
            } else if (element.classList.contains('project-card')) {
                scrollAnimations.scaleIn(element);
            } else {
                element.classList.add('visible');
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Observe elements with enhanced animations
document.querySelectorAll('.about-text, .skills-grid, .project-card').forEach(el => {
    enhancedObserver.observe(el);
});

// Contact form enhancement (if needed later)
function initContactForm() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        // Add floating animation to contact icons
        document.querySelectorAll('.contact-icon').forEach((icon, index) => {
            icon.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
        });
    }
}

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll progress update
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = Math.min(scrolled, 100) + '%';

    // Header scroll effect
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    updateActiveNavLink();
}, 16)); // ~60fps

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();

    // Add CSS for additional animations
    const style = document.createElement('style');
    // MODIFIED: Removed the .nav-link.active::after rule for the underline
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .nav-link {
            position: relative;
            overflow: hidden;
        }

        .nav-link::after { /* This defines the potential underline, but it's not activated by .active or .hover anymore */
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }

        /* Intentionally removed:
        .nav-link:hover::after,
        .nav-link.active::after {
            width: 80%;
        }
        */
    `;
    document.head.appendChild(style);
});

// Add smooth reveal for skills on scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skills = entry.target.querySelectorAll('.skill-item');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transform = 'translateY(0) scale(1)';
                    skill.style.opacity = '1';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.3 });

// Initialize skills with hidden state
document.querySelectorAll('.skills-grid').forEach(grid => {
    const skills = grid.querySelectorAll('.skill-item');
    skills.forEach(skill => {
        skill.style.transform = 'translateY(20px) scale(0.8)';
        skill.style.opacity = '0';
        skill.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    skillsObserver.observe(grid);
});

// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
    }, 1000);
});