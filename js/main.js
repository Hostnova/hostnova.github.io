// Main JavaScript file for HostNova website

// Document ready function
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initNavigation();
    // initScrollEffects(); // Commented out to prevent scroll effects from hiding text
    initNoAnimations(); // New function to ensure text visibility
    initFloatingElements();
    initOrbitals();
    initSectionBackgrounds();
    initCosmicBackground(); // Use this improved function
    
    // Make all sections visible immediately - fixes blank sections issue
    makeAllSectionsVisible();
    
    // Initialize fullpage navigation
    initFullPageNavigation();
    
    // Remove preloader after content loads
    setTimeout(() => {
        document.querySelector('.preloader')?.classList.add('fade-out');
        setTimeout(() => {
            document.querySelector('.preloader')?.remove();
        }, 500);
    }, 800);
});

// Initialize navigation components
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Mobile menu toggle
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (mobileNav?.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    navToggle?.classList.remove('active');
                }
                
                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle header state on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// New function to ensure text is always visible
function initNoAnimations() {
    // Make all text visible and disable animations
    document.querySelectorAll('.reveal-item, .featured-logo-text, .section-title, .section-label, h1, h2, h3, h4, h5, h6, p, li, a')
        .forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.display = 'block';
            
            // For elements that should be inline, reset display
            if (el.tagName === 'A' || el.tagName === 'SPAN' || el.tagName === 'LI') {
                el.style.display = '';
            }
            
            // Remove animation classes
            el.classList.remove('reveal-item', 'delay-1', 'delay-2', 'delay-3', 'delay-4');
        });
}

// New function to make all sections visible immediately
function makeAllSectionsVisible() {
    // Make all sections and their content visible
    document.querySelectorAll('.content-section, .cinematic-section, .pop-section, .section-orbital-bg')
        .forEach(section => {
            // Add the visible class to show the section
            section.classList.add('visible');
            
            // Make all reveal sections visible
            section.querySelectorAll('.reveal-section')
                .forEach(revealSection => {
                    revealSection.style.opacity = '1';
                });
                
            // Make all section background containers visible
            section.querySelectorAll('.section-bg-container, .bg-mask')
                .forEach(bgElement => {
                    bgElement.style.opacity = '1';
                });
                
            // Make all orbital decorations visible
            section.querySelectorAll('.orbital-decoration, .orbital-ring, .mini-satellite')
                .forEach(orbitalElement => {
                    orbitalElement.style.opacity = '0.6';
                    orbitalElement.style.transform = 'scale(1)';
                });
        });
}

// Initialize floating elements (particles, etc.)
function initFloatingElements() {
    // Create and animate floating elements
    document.querySelectorAll('.floating-elements-container').forEach(container => {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.setProperty('--direction', Math.random() > 0.5 ? '1' : '-1');
            container.appendChild(particle);
        }
    });
}

// Initialize orbital elements
function initOrbitals() {
    // Set up orbital animations and interactions
}

// Initialize section background effects
function initSectionBackgrounds() {
    // Set up background elements for sections
    document.querySelectorAll('[data-bg-type]').forEach(section => {
        const bgType = section.getAttribute('data-bg-type');
        const bgContainer = section.querySelector('.section-bg-container');
        
        // Enhanced background elements could be added here
        // For example, particles, animated shapes, etc.
        
        if (bgType === 'bg-tech') {
            // Add tech-themed background elements
            addTechElements(bgContainer);
        } else if (bgType === 'bg-cosmic') {
            // Add cosmic-themed background elements
            addCosmicElements(bgContainer);
        } else if (bgType === 'bg-network') {
            // Add network-themed background elements
            addNetworkElements(bgContainer);
        } else if (bgType === 'bg-digital') {
            // Add digital-themed background elements
            addDigitalElements(bgContainer);
        }
    });
}

// Helper functions for section backgrounds
function addTechElements(container) {
    if (!container) return;
    
    // Add grid pattern
    const grid = document.createElement('div');
    grid.className = 'bg-grid';
    container.appendChild(grid);
}

function addCosmicElements(container) {
    if (!container) return;
    
    // Add nebula effect
    const nebula = document.createElement('div');
    nebula.className = 'bg-nebula';
    
    const nebula1 = document.createElement('div');
    nebula1.className = 'nebula-cloud nebula-1';
    
    const nebula2 = document.createElement('div');
    nebula2.className = 'nebula-cloud nebula-2';
    
    const stars = document.createElement('div');
    stars.className = 'nebula-stars';
    
    nebula.appendChild(nebula1);
    nebula.appendChild(nebula2);
    nebula.appendChild(stars);
    container.appendChild(nebula);
}

function addNetworkElements(container) {
    if (!container) return;
    
    // Add orbital rings
    const orbitalRings = document.createElement('div');
    orbitalRings.className = 'bg-orbital-rings';
    
    for (let i = 1; i <= 3; i++) {
        const ring = document.createElement('div');
        ring.className = `orbital-ring ring-${i}`;
        orbitalRings.appendChild(ring);
    }
    
    const glow = document.createElement('div');
    glow.className = 'orbital-glow';
    orbitalRings.appendChild(glow);
    
    container.appendChild(orbitalRings);
}

function addDigitalElements(container) {
    if (!container) return;
    
    // Add digital waves
    const digitalWaves = document.createElement('div');
    digitalWaves.className = 'bg-digital-waves';
    
    for (let i = 1; i <= 3; i++) {
        const wave = document.createElement('div');
        wave.className = `wave wave-${i}`;
        digitalWaves.appendChild(wave);
    }
    
    const dataPoints = document.createElement('div');
    dataPoints.className = 'data-points';
    digitalWaves.appendChild(dataPoints);
    
    container.appendChild(digitalWaves);
}

// Initialize cosmic background with stars and elements
function initCosmicBackground() {
    const starLayer = document.querySelector('.star-layer');
    
    if (!starLayer) return;
    
    // Clear any existing stars
    starLayer.innerHTML = '';
    
    // Generate different types of stars
    generateStars(300, 'tiny');
    generateStars(150, 'small');
    generateStars(75, 'medium');
    generateStars(25, 'large');
    generateStars(15, 'bright-star');
    
    function generateStars(count, className) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = className === 'bright-star' ? 'bright-star' : `star ${className}`;
            
            // Random position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // For twinkling effect with random delays
            if (className === 'medium' || className === 'large' || className === 'bright-star') {
                star.style.animationDelay = `${Math.random() * 10}s`;
            }
            
            starLayer.appendChild(star);
        }
    }
}

// Initialize full page navigation system
function initFullPageNavigation() {
    // Get all section indicators and sections
    const indicators = document.querySelectorAll('.section-indicator');
    const sections = document.querySelectorAll('.content-section, #hero');
    const arrows = document.querySelectorAll('.section-arrow');
    
    // Handle section indicator clicks
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const targetId = indicator.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to section smoothly
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active indicator
                updateActiveIndicator(targetId);
            }
        });
    });
    
    // Handle section arrow clicks
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const targetId = arrow.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to section smoothly
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active indicator
                updateActiveIndicator(targetId);
            }
        });
    });
    
    // Update active indicator based on scroll position
    window.addEventListener('scroll', debounce(() => {
        updateActiveIndicatorOnScroll();
    }, 50));
    
    // Initial active indicator update
    updateActiveIndicatorOnScroll();
    
    // Handle keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            navigateToNextSection();
        } else if (e.key === 'ArrowUp') {
            navigateToPrevSection();
        }
    });
}

// Update active section indicator based on scroll position
function updateActiveIndicatorOnScroll() {
    const sections = document.querySelectorAll('.content-section, #hero');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            updateActiveIndicator(section.id);
        }
    });
}

// Update active indicator
function updateActiveIndicator(activeId) {
    const indicators = document.querySelectorAll('.section-indicator');
    
    indicators.forEach(indicator => {
        const sectionId = indicator.getAttribute('data-section');
        
        if (sectionId === activeId) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Navigate to next section
function navigateToNextSection() {
    const sections = Array.from(document.querySelectorAll('.content-section, #hero'));
    const scrollPosition = window.scrollY + 10;
    let nextSection = null;
    
    // Find the current section
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // If there's a next section, set it
            if (i < sections.length - 1) {
                nextSection = sections[i + 1];
            }
            break;
        }
    }
    
    // Scroll to next section if found
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
        updateActiveIndicator(nextSection.id);
    }
}

// Navigate to previous section
function navigateToPrevSection() {
    const sections = Array.from(document.querySelectorAll('.content-section, #hero'));
    const scrollPosition = window.scrollY + 10;
    let prevSection = null;
    
    // Find the current section
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // If there's a previous section, set it
            if (i > 0) {
                prevSection = sections[i - 1];
            }
            break;
        }
    }
    
    // Scroll to previous section if found
    if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth' });
        updateActiveIndicator(prevSection.id);
    }
}

// Debounce function to limit scroll event firing
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
