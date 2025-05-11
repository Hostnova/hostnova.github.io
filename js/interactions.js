/**
 * HostNova Interaction - User interactive elements
 * All user interaction functionality including cursor, parallax, and click effects
 */

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
