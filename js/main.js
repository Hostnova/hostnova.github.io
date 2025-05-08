// Main JavaScript for HostNova - Orbit Beyond Ordinary

document.addEventListener('DOMContentLoaded', () => {
    console.log('HostNova initialized');
    
    // Initialize features
    initNavigation();
    initNoAnimations();
    initFloatingElements();
    initOrbitals();
    initSectionBackgrounds();
    initCosmicBackground();
    makeAllSectionsVisible();
    initFullPageNavigation();
    initSectionTransitions();
    initInteractiveWidgets();
    initStarField();
    initRandomExplosions();
    initBreathingNebulas();
    initEnergyFlares();
    addAnimationClassesToText();
    initSectionBackgroundLoaders();

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
    // Check for orbital systems
    const orbitalSystem = document.querySelector('.orbital-system');
    if (!orbitalSystem) return;
    
    // Add traveler nodes to orbits
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach(orbit => {
        const traveler = document.createElement('div');
        traveler.className = 'orbit-traveler';
        
        // Randomize color with slight variation
        const hue = Math.random() > 0.5 ? '64, 220, 255' : '230, 181, 74';
        traveler.style.background = `rgba(${hue}, 0.9)`;
        traveler.style.boxShadow = `0 0 15px 4px rgba(${hue}, 0.6)`;
        traveler.style.setProperty('--color-primary', `rgba(${hue}, 0.9)`);
        
        orbit.appendChild(traveler);
        
        // Create trail effect for orbit travelers
        createOrbitTrailEffect(orbit, traveler);
    });
    
    // Add stellar dust particles
    addStellarDustParticles(orbitalSystem);
}

// Create trail effect for orbit travelers
function createOrbitTrailEffect(orbit, traveler) {
    // Create trails after the traveler
    setInterval(() => {
        const rect = traveler.getBoundingClientRect();
        const orbitRect = orbit.getBoundingClientRect();
        
        // Get position relative to orbit
        const x = rect.left + rect.width/2 - orbitRect.left;
        const y = rect.top + rect.height/2 - orbitRect.top;
        
        createTrailParticle(orbit, x, y, getComputedStyle(traveler).background);
    }, 150);
}

// Create trail particle
function createTrailParticle(orbit, x, y, color) {
    const trail = document.createElement('div');
    trail.className = 'orbital-trail';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    trail.style.background = color;
    orbit.appendChild(trail);
    
    // Remove after animation
    setTimeout(() => {
        if (orbit.contains(trail)) {
            orbit.removeChild(trail);
        }
    }, 3000);
}

// Add stellar dust particles floating around
function addStellarDustParticles(container) {
    // Create dust particles
    for (let i = 0; i < 15; i++) {
        const dust = document.createElement('div');
        dust.className = 'stellar-dust-particle';
        
        // Random position around center
        const angle = Math.random() * 360;
        const distance = 30 + Math.random() * 80;
        dust.style.setProperty('--angle', `${angle}deg`);
        dust.style.setProperty('--distance', `${distance}px`);
        
        // Center initially
        dust.style.top = '50%';
        dust.style.left = '50%';
        dust.style.transform = 'translate(-50%, -50%)';
        
        // Random animation duration
        dust.style.setProperty('--float-duration', `${10 + Math.random() * 10}s`);
        
        // Random color/opacity
        const opacity = 0.3 + Math.random() * 0.4;
        dust.style.opacity = opacity;
        
        // Random size
        const size = 1 + Math.random() * 2;
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        
        // Add to container
        container.appendChild(dust);
    }
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

// Enhanced Star Field Generation
function initStarField() {
    const starLayers = document.querySelectorAll('.star-layer');

    starLayers.forEach(layer => {
        // Clear any existing stars
        while (layer.firstChild) {
            layer.removeChild(layer.firstChild);
        }

        const isSubtleLayer = layer.parentElement && layer.parentElement.classList.contains('star-field-subtle');
        let starCount;

        if (isSubtleLayer) {
            // Fewer stars for subtle backgrounds
            starCount = window.innerWidth <= 768 ? 15 : 30; 
        } else {
            // Original star count for main hero star fields
            starCount = window.innerWidth <= 768 ? 50 : 120;
        }

        for (let i = 0; i < starCount; i++) {
            createStar(layer); 
        }
    });
}

// Create individual star with random properties
function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random positions
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;

    // Random size classes
    const sizeClasses = ['tiny', 'medium', 'large'];
    const sizeIndex = Math.floor(Math.random() * sizeClasses.length);
    star.classList.add(sizeClasses[sizeIndex]);

    // Random color
    const colorClasses = ['', 'blue', 'gold', 'red']; // Empty string means default white
    const colorIndex = Math.floor(Math.random() * colorClasses.length);
    if (colorClasses[colorIndex]) {
        star.classList.add(colorClasses[colorIndex]);
    }

    const isSubtle = container.parentElement && container.parentElement.classList.contains('star-field-subtle');

    if (!isSubtle) {
        // Set custom properties for animation variation for non-subtle stars
        star.style.setProperty('--twinkle-duration', `${2 + Math.random() * 4}s`);
        star.style.setProperty('--min-opacity', `${0.2 + Math.random() * 0.3}`);
        star.style.setProperty('--max-opacity', `${0.7 + Math.random() * 0.3}`);
        star.style.setProperty('--min-scale', `${0.6 + Math.random() * 0.3}`);
        star.style.setProperty('--max-scale', `${1 + Math.random() * 0.3}`);
    } else {
        // Set custom properties for subtle animation variation, respecting the CSS base
        star.style.setProperty('--twinkle-duration', `${4 + Math.random() * 2}s`); // Around 5s
        star.style.setProperty('--min-opacity', `${0.1 + Math.random() * 0.1}`);   // Around 0.1-0.2
        star.style.setProperty('--max-opacity', `${0.3 + Math.random() * 0.2}`);   // Around 0.3-0.5
        star.style.setProperty('--min-scale', `${0.4 + Math.random() * 0.2}`);    // Around 0.4-0.6
        star.style.setProperty('--max-scale', `${0.7 + Math.random() * 0.2}`);    // Around 0.7-0.9
    }

    // Set star position
    star.style.left = `${xPos}%`;
    star.style.top = `${yPos}%`;

    // Random animation delay
    star.style.animationDelay = `${Math.random() * 5}s`;

    // Add drift animation to some stars (applies to both subtle and non-subtle for now)
    if (Math.random() > 0.7) {
        star.style.animationName = 'star-twinkle, star-drift';
        star.style.animationDuration = `${star.style.getPropertyValue('--twinkle-duration')}, ${10 + Math.random() * 20}s`;
        star.style.animationTimingFunction = 'ease-in-out, linear';
        star.style.animationIterationCount = 'infinite, infinite';
        star.style.animationDirection = 'alternate, alternate';
        star.style.setProperty('--drift-x', `${-10 + Math.random() * 20}px`);
    }

    // Append the star to the container
    container.appendChild(star);

    return star;
}

// Initialize Random Cosmic Explosions
function initRandomExplosions() {
    const cosmicBackground = document.querySelector('.cosmic-background');
    if (!cosmicBackground) return;
    
    // Create explosions at random intervals
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to create explosion
            createRandomExplosion(cosmicBackground);
        }
    }, 2000);
}

// Create a random star explosion
function createRandomExplosion(container) {
    // Create explosion container
    const explosion = document.createElement('div');
    explosion.className = 'star-explosion';
    
    // Random position within the container
    const xPos = 10 + Math.random() * 80; // Keep away from edges
    const yPos = 10 + Math.random() * 80;
    explosion.style.left = `${xPos}%`;
    explosion.style.top = `${yPos}%`;
    
    // Random size and color
    const size = 2 + Math.random() * 3;
    explosion.style.width = `${size}px`;
    explosion.style.height = `${size}px`;
    
    // Random color class
    const colorClasses = ['blue', 'gold', 'red'];
    const colorIndex = Math.floor(Math.random() * colorClasses.length);
    const colorClass = colorClasses[colorIndex];
    
    // Create explosion particles
    const particleCount = 6 + Math.floor(Math.random() * 8);
    for (let i = 0; i < particleCount; i++) {
        createExplosionParticle(explosion, colorClass);
    }
    
    // Add to container
    container.appendChild(explosion);
    
    // Remove after animation completes
    setTimeout(() => {
        if (container.contains(explosion)) {
            container.removeChild(explosion);
        }
    }, 3000);
}

// Create individual explosion particle
function createExplosionParticle(container, colorClass) {
    const particle = document.createElement('div');
    particle.className = `explosion-particle ${colorClass}`;
    
    // Random angle
    const angle = Math.random() * 360;
    particle.style.setProperty('--angle', `${angle}deg`);
    
    // Random distance
    const distance = 30 + Math.random() * 50;
    particle.style.setProperty('--distance', `${distance}px`);
    
    // Random duration
    const duration = 1 + Math.random() * 1.5;
    particle.style.setProperty('--particle-duration', `${duration}s`);
    
    // Add to container
    container.appendChild(particle);
}

// Initialize Breathing Nebulas
function initBreathingNebulas() {
    const cosmicBackground = document.querySelector('.cosmic-background');
    if (!cosmicBackground) return;
    
    // Create several nebulas
    for (let i = 0; i < 3; i++) {
        createBreathingNebula(cosmicBackground);
    }
}

// Create a breathing nebula effect
function createBreathingNebula(container) {
    const nebula = document.createElement('div');
    nebula.className = 'breathing-nebula';
    
    // Random position
    nebula.style.left = `${Math.random() * 100}%`;
    nebula.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = 200 + Math.random() * 300;
    nebula.style.width = `${size}px`;
    nebula.style.height = `${size}px`;
    
    // Random animation delay
    nebula.style.animationDelay = `${Math.random() * 5}s`;
    
    // Add to container
    container.appendChild(nebula);
}

// Initialize Energy Flares from the central star
function initEnergyFlares() {
    const orbitalCenter = document.querySelector('.orbital-center');
    if (!orbitalCenter) return;
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            createEnergyFlare(orbitalCenter.parentElement);
        }
    }, 3000);
}

// Create energy flare from central star
function createEnergyFlare(container) {
    const flare = document.createElement('div');
    flare.className = 'energy-flare';
    
    // Random angle
    const angle = Math.random() * 360;
    flare.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    
    // Random properties
    flare.style.opacity = 0.7 + Math.random() * 0.3;
    flare.style.animationDuration = `${2 + Math.random() * 2}s`;
    
    // Add to container
    container.appendChild(flare);
    
    // Remove after animation completes
    setTimeout(() => {
        if (container.contains(flare)) {
            container.removeChild(flare);
        }
    }, 3000);
}

// Initialize full page navigation system
function initFullPageNavigation() {
    // Get all section indicators and sections
    const indicators = document.querySelectorAll('.section-indicator');
    const sections = document.querySelectorAll('.content-section, #hero');
    const arrows = document.querySelectorAll('.section-arrow');
    
    // Set initial active section
    const currentSection = getCurrentSection();
    if (currentSection) {
        setActiveSection(currentSection.id);
    }
    
    // Handle section indicator clicks
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const targetId = indicator.getAttribute('data-section');
            navigateToSection(targetId);
        });
    });
    
    // Handle section arrow clicks
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const targetId = arrow.getAttribute('data-target');
            navigateToSection(targetId);
        });
    });
    
    // Update active indicator based on scroll position
    window.addEventListener('scroll', debounce(() => {
        // Only update indicator if not in transition
        if (!document.body.classList.contains('is-transitioning')) {
            updateActiveIndicatorOnScroll();
        }
    }, 50));
    
    // Handle keyboard navigation
    window.addEventListener('keydown', (e) => {
        // Only respond to arrow keys if not in transition
        if (document.body.classList.contains('is-transitioning')) {
            return;
        }
        
        if (e.key === 'ArrowDown') {
            navigateToNextSection();
        } else if (e.key === 'ArrowUp') {
            navigateToPrevSection();
        }
    });
}

// Initialize section transitions
function initSectionTransitions() {
    // Implementation for smooth section transitions
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const navIndicators = document.querySelectorAll('.section-indicator');
    const sectionArrows = document.querySelectorAll('.section-arrow');
    
    // Setup intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const sectionId = entry.target.id;
                
                // Update nav indicators
                navIndicators.forEach(indicator => {
                    if (indicator.dataset.section === sectionId) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
                
                // Add visible class for animation
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Set up click handlers for nav indicators
    navIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const targetSection = document.getElementById(indicator.dataset.section);
            if (targetSection) {
                animateTransitionToSection(targetSection);
                smoothScrollToElement(targetSection);
            }
        });
    });
    
    // Set up click handlers for section arrows
    sectionArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const targetSection = document.getElementById(arrow.dataset.target);
            if (targetSection) {
                animateTransitionToSection(targetSection);
                smoothScrollToElement(targetSection);
            }
        });
    });
}

// Animate transition between sections
function animateTransitionToSection(targetSection) {
    const transitionOverlay = document.querySelector('.section-transition-overlay');
    const transitionCircles = document.querySelectorAll('.transition-circle');
    
    // Randomize which circle leads the transition
    const randomIndex = Math.floor(Math.random() * transitionCircles.length);
    
    transitionOverlay.style.display = 'block';
    transitionOverlay.style.opacity = '1';
    
    transitionCircles.forEach((circle, index) => {
        circle.style.transitionDelay = `${(index + randomIndex) % transitionCircles.length * 0.08}s`;
        circle.style.transform = 'scale(1)';
    });
    
    setTimeout(() => {
        transitionCircles.forEach((circle) => {
            circle.style.transform = 'scale(0)';
        });
        
        setTimeout(() => {
            transitionOverlay.style.opacity = '0';
            setTimeout(() => {
                transitionOverlay.style.display = 'none';
            }, 500);
        }, 500);
    }, 800);
}

// Smooth scroll to element
function smoothScrollToElement(element) {
    window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
    });
}

// Initialize interactive section widgets
function initInteractiveWidgets() {
    const widgets = document.querySelectorAll('.section-widget');
    
    widgets.forEach(widget => {
        widget.addEventListener('click', () => {
            const targetSection = document.getElementById(widget.dataset.target);
            if (targetSection) {
                animateTransitionToSection(targetSection);
                smoothScrollToElement(targetSection);
            }
        });
        
        // Add hover effects
        widget.addEventListener('mouseenter', () => {
            widget.classList.add('active');
        });
        
        widget.addEventListener('mouseleave', () => {
            widget.classList.remove('active');
        });
    });
}

// Add animation classes to text elements
function addAnimationClassesToText() {
    // Select all relevant text elements
    const textElements = document.querySelectorAll(
        'h1, h2, h3, p, .section-label, .feature-item, .teaser-item, .card'
    );
    
    // Add animation class to all selected elements
    textElements.forEach(element => {
        element.classList.add('animate-text-element');
    });
    
    // Special character-by-character animation for certain headings
    initCharacterAnimation();
    
    // Typing effect for selected elements
    initTypingEffect();
}

// Initialize character-by-character animation
function initCharacterAnimation() {
    // Target specific headings for character animation
    const charAnimationElements = [
        ...document.querySelectorAll('#hero .hero-title, #brand-vision h2, #features h2'),
    ];
    
    charAnimationElements.forEach(element => {
        // Skip already processed elements
        if (element.querySelector('.animate-chars-container')) {
            return;
        }
        
        const text = element.textContent;
        element.textContent = '';
        
        // Create a container for the animated characters
        const container = document.createElement('span');
        container.className = 'animate-chars-container';
        
        // Split text and create spans for each character
        [...text].forEach((char, index) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'animate-char';
            charSpan.textContent = char;
            charSpan.style.transitionDelay = `${0.03 * index}s`;
            container.appendChild(charSpan);
        });
        
        element.appendChild(container);
    });
}

// Initialize typing effect animation
function initTypingEffect() {
    // Target elements for typing effect
    const typingElements = document.querySelectorAll('.section-label, #gainchain h3, #portfolio h3');
    
    typingElements.forEach(element => {
        element.classList.add('typing-text');
    });
}

// Update section states based on viewport position
function updateSectionStates() {
    const sections = document.querySelectorAll('.content-section, #hero');
    const windowMiddle = window.scrollY + (window.innerHeight / 2);
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Check if section is active (in viewport)
        if (windowMiddle >= sectionTop && windowMiddle < sectionBottom) {
            section.classList.add('section-active');
            section.classList.remove('section-entering', 'section-exiting-up', 'section-exiting-down');
        } 
        // Section is above viewport
        else if (windowMiddle >= sectionBottom) {
            section.classList.add('section-exiting-up');
            section.classList.remove('section-active', 'section-entering', 'section-exiting-down');
        } 
        // Section is below viewport
        else {
            section.classList.add('section-entering');
            section.classList.remove('section-active', 'section-exiting-up', 'section-exiting-down');
        }
    });
}

// Smoothly navigate to a section
function navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    
    if (!targetSection || document.body.classList.contains('is-transitioning')) {
        return;
    }
    
    // Mark body as transitioning to prevent multiple transitions
    document.body.classList.add('is-transitioning');
    
    // Get current and target section positions
    const currentSection = getCurrentSection();
    const isScrollingDown = currentSection && targetSection.offsetTop > currentSection.offsetTop;
    
    // Set appropriate transition classes
    if (currentSection) {
        if (isScrollingDown) {
            currentSection.classList.add('section-exiting-up');
        } else {
            currentSection.classList.add('section-exiting-down');
        }
        currentSection.classList.remove('section-active');
    }
    
    // Trigger transition overlay effect based on section
    triggerTransitionOverlay(sectionId);
    
    targetSection.classList.add('section-entering');
    targetSection.classList.remove('section-active');
    
    // Force browser to recognize the class changes
    void targetSection.offsetWidth; 
    
    // Apply active class to trigger transition
    targetSection.classList.remove('section-entering');
    targetSection.classList.add('section-active');
    
    // Scroll to the section
    targetSection.scrollIntoView({ behavior: 'smooth' });
    
    // Update active indicator
    updateActiveIndicator(sectionId);
    
    // Remove transitioning flag after animation completes
    setTimeout(() => {
        document.body.classList.remove('is-transitioning');
        updateSectionStates();
    }, 1000);
}

// Function to trigger transition overlay effect
function triggerTransitionOverlay(sectionId) {
    // Map of sections to their corresponding color class
    const sectionColorMap = {
        'hero': 'transition-color-gold',
        'brand-vision': 'transition-color-blue',
        'features': 'transition-color-cyan',
        'hostara': 'transition-color-green',
        'gainchain': 'transition-color-pink',
        'community': 'transition-color-lime',
        'portfolio': 'transition-color-amber',
        'contact': 'transition-color-aqua'
    };
    
    // Get overlay and all circles
    const overlay = document.querySelector('.section-transition-overlay');
    const circles = document.querySelectorAll('.transition-circle');
    
    // Hide all circles initially
    circles.forEach(circle => {
        circle.style.display = 'none';
    });
    
    // Find target circle based on section
    const targetColorClass = sectionColorMap[sectionId] || 'transition-color-gold';
    const targetCircle = document.querySelector(`.${targetColorClass}`);
    
    if (targetCircle && overlay) {
        // Position circle at click/widget position or center
        const lastClickEvent = window.lastClickPosition || { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
        
        targetCircle.style.display = 'block';
        targetCircle.style.left = `${lastClickEvent.clientX}px`;
        targetCircle.style.top = `${lastClickEvent.clientY}px`;
        
        // Add active class to start animation
        document.body.classList.add('transition-active');
        
        // Remove active class after animation completes
        setTimeout(() => {
            document.body.classList.remove('transition-active');
            targetCircle.style.display = 'none';
        }, 1200);
    }
}

// Update active section indicator based on scroll position
function updateActiveIndicatorOnScroll() {
    const currentSection = getCurrentSection();
    if (currentSection) {
        updateActiveIndicator(currentSection.id);
    }
}

// Get current visible section
function getCurrentSection() {
    const sections = Array.from(document.querySelectorAll('.content-section, #hero'));
    const scrollPosition = window.scrollY + (window.innerHeight / 2);
    
    return sections.find(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
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

// Set active section without animation
function setActiveSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        document.querySelectorAll('.content-section, #hero').forEach(s => {
            s.classList.remove('section-active', 'section-entering', 'section-exiting-up', 'section-exiting-down');
            
            if (s.id === sectionId) {
                s.classList.add('section-active');
            } else if (s.offsetTop < section.offsetTop) {
                s.classList.add('section-exiting-up');
            } else {
                s.classList.add('section-entering');
            }
        });
        
        // Update indicators
        updateActiveIndicator(sectionId);
    }
}

// Navigate to next section
function navigateToNextSection() {
    const sections = Array.from(document.querySelectorAll('.content-section, #hero'));
    const currentSection = getCurrentSection();
    
    if (currentSection) {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            navigateToSection(nextSection.id);
        }
    }
}

// Navigate to previous section
function navigateToPrevSection() {
    const sections = Array.from(document.querySelectorAll('.content-section, #hero'));
    const currentSection = getCurrentSection();
    
    if (currentSection) {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex > 0) {
            const prevSection = sections[currentIndex - 1];
            navigateToSection(prevSection.id);
        }
    }
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Check if element center point is in viewport
    const vertInView = (rect.top + rect.height / 2) >= 0 && (rect.top + rect.height / 2) < windowHeight;
    const horInView = (rect.left + rect.width / 2) >= 0 && (rect.left + rect.width / 2) < windowWidth;
    
    return vertInView && horInView;
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

// Initialize interactive section widgets
function initSectionWidgets() {
    // Get all section widgets
    const sectionWidgets = document.querySelectorAll('.section-widget');
    
    // Add click event listeners to all widgets
    sectionWidgets.forEach(widget => {
        widget.addEventListener('click', (e) => {
            // Store click position for transition effect
            window.lastClickPosition = {
                clientX: e.clientX,
                clientY: e.clientY
            };
            
            // Get target section ID from the data-target attribute
            const targetId = widget.getAttribute('data-target');
            
            // Navigate to that section with zoom effect
            if (targetId) {
                navigateToSection(targetId);
                
                // Add special click animation for the widget
                widget.classList.add('widget-clicked');
                
                // Remove the animation class after animation completes
                setTimeout(() => {
                    widget.classList.remove('widget-clicked');
                }, 700);
            }
        });
        
        // Add hover effect for widgets - parallax movement
        widget.addEventListener('mousemove', (e) => {
            // Only on desktop devices
            if (window.innerWidth > 1024) {
                const boundingRect = widget.getBoundingClientRect();
                const widgetCenterX = boundingRect.left + boundingRect.width / 2;
                const widgetCenterY = boundingRect.top + boundingRect.height / 2;
                
                // Calculate mouse position relative to widget center
                const mouseX = e.clientX - widgetCenterX;
                const mouseY = e.clientY - widgetCenterY;
                
                // Apply subtle transform based on mouse position
                widget.style.transform = `translateX(-50%) perspective(500px) rotateY(${mouseX * 0.02}deg) rotateX(${-mouseY * 0.02}deg) scale(1.05)`;
            }
        });
        
        // Reset transform on mouse leave
        widget.addEventListener('mouseleave', () => {
            widget.style.transform = '';
        });
    });
    
    // Track all click positions for better transitions
    document.addEventListener('click', (e) => {
        window.lastClickPosition = {
            clientX: e.clientX,
            clientY: e.clientY
        };
    });
    
    // Add CSS for widget click animation
    addWidgetClickStyleToDOM();
}

// Function to add widget click animation CSS dynamically
function addWidgetClickStyleToDOM() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .widget-clicked {
            animation: widget-click 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards !important;
        }
        
        @keyframes widget-click {
            0% {
                transform: translateX(-50%) scale(1);
                filter: brightness(1);
            }
            20% {
                transform: translateX(-50%) scale(0.8);
                filter: brightness(1.5);
            }
            40% {
                transform: translateX(-50%) scale(1.1);
                filter: brightness(1.2);
            }
            100% {
                transform: translateX(-50%) scale(0);
                opacity: 0;
                filter: brightness(2);
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Function to initialize section background loading animations
function initSectionBackgroundLoaders() {
    // Skip hero section as requested
    const sections = document.querySelectorAll('#brand-vision, #features, #hostara, #gainchain, #community, #portfolio, #contact');
    
    sections.forEach(section => {
        const sectionId = section.id;
        
        // Create loading animation container
        const loaderContainer = document.createElement('div');
        loaderContainer.className = 'section-loading-animation';
        
        // Create different loaders based on section ID
        switch(sectionId) {
            case 'brand-vision':
                createNebulaLoader(loaderContainer);
                break;
            case 'features':
                createMatrixLoader(loaderContainer);
                break;
            case 'hostara':
                createNetworkLoader(loaderContainer);
                break;
            case 'gainchain':
                createDigitalWaveLoader(loaderContainer);
                break;
            case 'community':
                createCommunityLoader(loaderContainer);
                break;
            case 'portfolio':
                createPortfolioLoader(loaderContainer);
                break;
            case 'contact':
                createContactLoader(loaderContainer);
                break;
        }
        
        // Add loader container to section
        section.appendChild(loaderContainer);
    });
}

// Create nebula loader for Brand Vision section
function createNebulaLoader(container) {
    // Add nebula loader class
    container.classList.add('nebula-loader');
    
    // Add nebula particles
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'nebula-particle';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 8}s`;
        
        container.appendChild(particle);
    }
}

// Create matrix loader for Features section
function createMatrixLoader(container) {
    // Add matrix loader class
    container.classList.add('matrix-loader');
    
    // Add falling matrix lines
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'matrix-line';
        
        // Random position
        line.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        line.style.animationDelay = `${Math.random() * 8}s`;
        
        // Random opacity
        line.style.opacity = 0.3 + Math.random() * 0.5;
        
        container.appendChild(line);
    }
    
    // Add matrix dots
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'matrix-dot';
        
        // Random position
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        dot.style.animationDelay = `${Math.random() * 4}s`;
        
        container.appendChild(dot);
    }
}

// Create network loader for Hostara section
function createNetworkLoader(container) {
    // Add network loader class
    container.classList.add('network-loader');
    
    // Create network nodes
    const nodes = [];
    for (let i = 0; i < 15; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        
        // Random position
        const x = 10 + Math.random() * 80; // Keep within 10-90% of container
        const y = 10 + Math.random() * 80;
        node.style.top = `${y}%`;
        node.style.left = `${x}%`;
        
        container.appendChild(node);
        nodes.push({ element: node, x, y });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            // Only connect some nodes (30% chance)
            if (Math.random() > 0.7) {
                const connection = document.createElement('div');
                connection.className = 'network-connection';
                
                // Calculate position and length
                const startX = nodes[i].x;
                const startY = nodes[i].y;
                const endX = nodes[j].x;
                const endY = nodes[j].y;
                
                // Calculate distance and angle
                const dx = endX - startX;
                const dy = endY - startY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                // Position connection line
                connection.style.width = `${distance}%`;
                connection.style.left = `${startX}%`;
                connection.style.top = `${startY}%`;
                connection.style.transform = `rotate(${angle}deg)`;
                
                // Random animation delay
                connection.style.animationDelay = `${Math.random() * 2}s`;
                
                container.appendChild(connection);
            }
        }
    }
}

// Create digital wave loader for GainChain section
function createDigitalWaveLoader(container) {
    // Add digital wave loader class
    container.classList.add('digital-wave-loader');
    
    // Create digital waves
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'digital-wave';
        
        // Set different positions and delays
        wave.style.top = `${20 + i * 30}%`;
        wave.style.animationDelay = `${i * 5}s`;
        
        container.appendChild(wave);
    }
    
    // Add digital glitch effects
    for (let i = 0; i < 5; i++) {
        const glitch = document.createElement('div');
        glitch.className = 'digital-glitch';
        
        // Set random position
        glitch.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        glitch.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(glitch);
    }
}

// Create community loader for Community section
function createCommunityLoader(container) {
    // Add community loader class
    container.classList.add('community-loader');
    
    // Create community dots
    const dots = [];
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'community-dot';
        
        // Random position
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;
        dot.style.top = `${y}%`;
        dot.style.left = `${x}%`;
        
        container.appendChild(dot);
        dots.push({ element: dot, x, y });
    }
    
    // Create pulse effects from random dots
    for (let i = 0; i < 5; i++) {
        const randomDotIndex = Math.floor(Math.random() * dots.length);
        const randomDot = dots[randomDotIndex];
        
        const pulse = document.createElement('div');
        pulse.className = 'community-pulse';
        
        // Position at dot
        pulse.style.left = `${randomDot.x}%`;
        pulse.style.top = `${randomDot.y}%`;
        
        // Random animation delay
        pulse.style.animationDelay = `${i * 0.8}s`;
        
        container.appendChild(pulse);
    }
}

// Create portfolio loader for Portfolio section
function createPortfolioLoader(container) {
    // Add portfolio loader class
    container.classList.add('portfolio-loader');
    
    // Create floating portfolio frames
    for (let i = 0; i < 10; i++) {
        const frame = document.createElement('div');
        frame.className = 'portfolio-frame';
        
        // Random position
        frame.style.top = `${10 + Math.random() * 80}%`;
        frame.style.left = `${10 + Math.random() * 80}%`;
        
        // Random size variation
        const scaleVar = 0.7 + Math.random() * 0.6;
        frame.style.transform = `scale(${scaleVar})`;
        
        // Random animation delay
        frame.style.animationDelay = `${Math.random() * 6}s`;
        
        container.appendChild(frame);
    }
}

// Create contact loader for Contact section
function createContactLoader(container) {
    // Add contact loader class
    container.classList.add('contact-loader');
    
    // Create concentric rings
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.className = 'contact-ring';
        
        // Size variations
        const size = 100 + (i * 50);
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        
        // Animation delay
        ring.style.animationDelay = `${i * 1.3}s`;
        
        container.appendChild(ring);
    }
    
    // Create scanning beams
    for (let i = 0; i < 3; i++) {
        const beam = document.createElement('div');
        beam.className = 'contact-beam';
        
        // Position and size
        beam.style.top = '0';
        beam.style.left = `${20 + (i * 30)}%`;
        beam.style.height = `${150 + Math.random() * 150}px`;
        
        // Animation delay
        beam.style.animationDelay = `${i * 2.5}s`;
        
        container.appendChild(beam);
    }
}

// Handle scroll animations for reveal sections
document.addEventListener('scroll', () => {
    const revealSections = document.querySelectorAll('.reveal-section');
    const revealItems = document.querySelectorAll('.reveal-item');
    
    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.classList.add('revealed');
        }
    });
    
    revealItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.9) {
            item.classList.add('revealed');
        }
    });
});

// Preload images for smoother experience
function preloadImages() {
    const images = [
        'images/backgrounds/hero-poster.jpg',
        'images/backgrounds/decentralized-network-abstract.jpg',
        'images/interfaces/hostara-interface-demo.jpg',
        'images/interfaces/gainchain-os-interface-concept.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();
