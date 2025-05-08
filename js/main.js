/**
 * HostNova Main JavaScript
 * Enhanced interactive cosmic elements and dynamic animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeCosmicBackground();
    initializeInteractiveElements();
    initializeParallaxEffects();
    initializeOrbitalAnimations();
    initializeCustomCursor();
});

/**
 * Initialize the cosmic background with stars and effects
 */
function initializeCosmicBackground() {
    // Generate stars for different layers
    createStars('star-layer-primary', 180, ['primary-star']);
    createStars('star-layer-secondary', 120, ['secondary-star']);
    
    // Add occasional star twinkle effect
    setInterval(randomStarTwinkle, 800);
    
    // Add random star explosions
    setInterval(createRandomStarExplosion, 6000);
    
    // Setup animated data streams
    setupDataStreams();
}

/**
 * Create stars with different properties for starfield
 */
function createStars(layerId, count, classNames) {
    const layer = document.getElementById(layerId);
    if (!layer) return;
    
    // Clear existing stars if any
    layer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star', ...classNames);
        
        // Random position
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        // Random size for variation
        const size = Math.random() * 3 + 1;
        if (size < 1.5) star.classList.add('tiny');
        else if (size > 2.5) star.classList.add('large');
        else star.classList.add('medium');
        
        // Random colors for some stars
        if (Math.random() < 0.15) {
            const colorClass = Math.random() < 0.33 ? 'blue' : 
                              (Math.random() < 0.5 ? 'gold' : 'red');
            star.classList.add(colorClass);
        }
        
        // Random twinkle animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.setProperty('--twinkle-duration', `${3 + Math.random() * 4}s`);
        
        layer.appendChild(star);
    }
}

/**
 * Create a random star explosion effect
 */
function createRandomStarExplosion() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Don't create explosions on small screens
    if (viewportWidth < 768) return;
    
    const explosion = document.createElement('div');
    explosion.className = 'star-explosion';
    
    // Random position in the viewport
    explosion.style.left = `${30 + Math.random() * (viewportWidth - 60)}px`;
    explosion.style.top = `${30 + Math.random() * (viewportHeight - 60)}px`;
    
    document.body.appendChild(explosion);
    
    // Create particles
    const particleCount = 8 + Math.floor(Math.random() * 8);
    const colorTypes = ['blue', 'gold', 'red', ''];
    const colorClass = colorTypes[Math.floor(Math.random() * colorTypes.length)];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `explosion-particle ${colorClass}`;
        
        // Set animation variables
        const angle = (i / particleCount) * 360;
        const distance = 50 + Math.random() * 50;
        const duration = 1 + Math.random() * 1;
        
        particle.style.setProperty('--angle', `${angle}deg`);
        particle.style.setProperty('--distance', `${distance}px`);
        particle.style.setProperty('--particle-duration', `${duration}s`);
        
        explosion.appendChild(particle);
    }
    
    // Clean up after animation
    setTimeout(() => {
        explosion.remove();
    }, 3000);
}

/**
 * Make random stars twinkle more intensely
 */
function randomStarTwinkle() {
    const stars = document.querySelectorAll('.star');
    if (stars.length === 0) return;
    
    // Random star to enhance
    const randomStar = stars[Math.floor(Math.random() * stars.length)];
    
    // Animate with enhanced twinkle
    randomStar.style.setProperty('--min-opacity', '0.2');
    randomStar.style.setProperty('--max-opacity', '1');
    randomStar.style.setProperty('--min-scale', '0.7');
    randomStar.style.setProperty('--max-scale', '1.3');
    
    // Reset after animation
    setTimeout(() => {
        randomStar.style.setProperty('--min-opacity', '');
        randomStar.style.setProperty('--max-opacity', '');
        randomStar.style.setProperty('--min-scale', '');
        randomStar.style.setProperty('--max-scale', '');
    }, 2000);
}

/**
 * Setup animated data streams
 */
function setupDataStreams() {
    const container = document.querySelector('.data-stream-container');
    if (!container) return;
    
    // Clear existing streams
    container.innerHTML = '';
    
    // Create data streams
    for (let i = 0; i < 6; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        
        // Position with variation
        stream.style.top = `${10 + Math.random() * 80}%`;
        stream.style.transform = `rotate(${(Math.random() - 0.5) * 10}deg)`;
        stream.style.animationDelay = `${i * 2.5}s`;
        
        container.appendChild(stream);
    }
}

/**
 * Initialize interactive elements
 */
function initializeInteractiveElements() {
    // Interactive particle effect on click
    document.addEventListener('click', createClickParticles);
    
    // Add energy beams between satellites
    setupEnergyBeams();
}

/**
 * Create particles on click
 */
function createClickParticles(e) {
    // Only on desktop
    if (window.innerWidth <= 768) return;
    
    // Create particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.classList.add('interactive-particle');
        
        // Alternate color
        if (i % 2 !== 0) {
            particle.style.backgroundColor = '#64ffda';
        }
        
        // Random position offsets
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;
        
        // Set custom properties for the animation
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);
        
        // Position at click coordinates
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        // Add to body and clean up after animation
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 4000);
    }
}

/**
 * Setup energy beams between orbital satellites
 */
function setupEnergyBeams() {
    const logo = document.querySelector('.featured-logo');
    if (!logo) return;
    
    // Get satellite elements
    const satellites = [
        logo.querySelector('.orbital-satellite'),
        logo.querySelector('.orbital-satellite-secondary'),
        logo.querySelector('.orbital-satellite-tertiary')
    ].filter(Boolean);
    
    if (satellites.length < 2) return;
    
    // Create beams between satellites
    for (let i = 0; i < satellites.length - 1; i++) {
        const beam = document.createElement('div');
        beam.className = 'energy-beam';
        logo.appendChild(beam);
        
        // Update beam position in animation frame
        function updateBeamPosition() {
            const sat1Rect = satellites[i].getBoundingClientRect();
            const sat2Rect = satellites[i+1].getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();
            
            // Calculate positions relative to container
            const x1 = sat1Rect.left + sat1Rect.width/2 - logoRect.left;
            const y1 = sat1Rect.top + sat1Rect.height/2 - logoRect.top;
            const x2 = sat2Rect.left + sat2Rect.width/2 - logoRect.left;
            const y2 = sat2Rect.top + sat2Rect.height/2 - logoRect.top;
            
            // Calculate length and angle
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            // Set beam properties
            beam.style.width = `${length}px`;
            beam.style.left = `${x1}px`;
            beam.style.top = `${y1}px`;
            beam.style.transform = `rotate(${angle}deg)`;
            
            requestAnimationFrame(updateBeamPosition);
        }
        
        updateBeamPosition();
    }
}

/**
 * Initialize parallax effects
 */
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(element => {
            const depth = 20;
            const moveX = (mouseX - 0.5) * depth;
            const moveY = (mouseY - 0.5) * depth;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Parallax on scroll for background elements
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const nebulas = document.querySelectorAll('.nebula');
        
        nebulas.forEach((nebula, index) => {
            const speed = index % 2 === 0 ? 0.05 : 0.03;
            const yPos = -scrollY * speed;
            nebula.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Initialize orbital animations
 */
function initializeOrbitalAnimations() {
    // Create orbital trail elements
    setupOrbitalTrails();
    
    // Occasionally create energy flares
    setInterval(createEnergyFlare, 3000);
}

/**
 * Setup orbital trails
 */
function setupOrbitalTrails() {
    const logo = document.querySelector('.featured-logo');
    if (!logo) return;
    
    const trail = document.createElement('div');
    trail.className = 'orbital-trail';
    logo.appendChild(trail);
    
    // Create trail segments
    for (let i = 0; i < 5; i++) {
        const segment = document.createElement('div');
        segment.className = 'orbital-trail-segment';
        trail.appendChild(segment);
    }
}

/**
 * Create energy flare from central element
 */
function createEnergyFlare() {
    const center = document.querySelector('.orbital-center');
    if (!center) return;
    
    const flare = document.createElement('div');
    flare.className = 'energy-flare';
    
    // Random angle
    const angle = Math.random() * 360;
    flare.style.transform = `translate(-50%, 0) rotate(${angle}deg)`;
    
    center.appendChild(flare);
    
    // Clean up after animation
    setTimeout(() => flare.remove(), 3000);
}

/**
 * Initialize custom cursor
 */
function initializeCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursorDot || !cursorFollower) return;
    
    document.addEventListener('mousemove', function(e) {
        // Set position directly for dot (fast follower)
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        // Add slight delay to follower for smooth effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 70);
    });
    
    // Change cursor appearance on interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-hover, a, button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderColor = 'rgba(100, 255, 218, 0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderColor = 'rgba(76, 176, 243, 0.3)';
        });
    });
}
