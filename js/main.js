/**
 * HostNova Main JavaScript
 * Enhanced interactive cosmic elements and dynamic animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle preloader immediately
    handlePreloader();
    
    // Initialize components
    initializeCosmicBackground();
    initializeInteractiveElements();
    initializeParallaxEffects();
    initializeOrbitalAnimations();
    initializeCustomCursor();
    initializeBusinessSection();
    handleSectionLoading();
    
    // Add window resize handler for responsive custom cursor
    window.addEventListener('resize', handleCustomCursorResponsive);
    
    // Initial check for custom cursor
    handleCustomCursorResponsive();
});

// Handle preloader with better reliability
function handlePreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    // Force dismiss preloader after a safety timeout (5s) in case something goes wrong
    const safetyTimeout = setTimeout(() => {
        console.log('Safety timeout triggered for preloader');
        forceHidePreloader();
    }, 5000);
    
    // Normal preloader dismissal
    window.addEventListener('load', () => {
        clearTimeout(safetyTimeout);
        hidePreloader();
        
        // Initialize section loading handlers after main preloader
        handleSectionLoading();
    });
    
    // Additional safety check - if window already loaded, hide immediately
    if (document.readyState === 'complete') {
        clearTimeout(safetyTimeout);
        hidePreloader();
        handleSectionLoading();
    }
    
    function hidePreloader() {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 600); // Match this with the CSS transition duration
        }, 500); // Short delay to ensure content is ready
    }
    
    function forceHidePreloader() {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 100);
    }
}

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
 * Initialize business section with animations and effects for corporate appearance
 */
function initializeBusinessSection() {
    // Immediately add visible class to all business cards and testimonials
    document.querySelectorAll('.business-card.animate-text-element, .testimonial-card').forEach((el, index) => {
        el.classList.add('visible');
        // Add staggered animation delays for smoother entry
        el.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Animate business elements on scroll
    const animateBusinessElements = () => {
        // Animate business cards
        const elements = document.querySelectorAll('.animate-text-element');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = elementTop < window.innerHeight - 100 && elementBottom > 0;
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
        
        // Animate testimonial cards
        const testimonials = document.querySelectorAll('.testimonial-card');
        testimonials.forEach(testimonial => {
            const testimonialTop = testimonial.getBoundingClientRect().top;
            const testimonialBottom = testimonial.getBoundingClientRect().bottom;
            const isVisible = testimonialTop < window.innerHeight - 100 && testimonialBottom > 0;
            
            if (isVisible) {
                testimonial.classList.add('visible');
            }
        });
          // Animate app mockups with staggered delays for a more professional appearance
        const appMockups = document.querySelectorAll('.app-mockup');
        appMockups.forEach((mockup, index) => {
            const mockupTop = mockup.getBoundingClientRect().top;
            const mockupBottom = mockup.getBoundingClientRect().bottom;
            const isVisible = mockupTop < window.innerHeight - 100 && mockupBottom > 0;
            
            if (isVisible) {
                mockup.style.opacity = '1';
                mockup.style.animationDelay = `${0.2 * index}s`;
                mockup.style.animationName = 'fadeInCorporate';
            }
        });
          // Animate metrics with corporate progressive reveal
        const metricItems = document.querySelectorAll('.metric-item');
        metricItems.forEach((metric, index) => {
            const metricTop = metric.getBoundingClientRect().top;
            const metricBottom = metric.getBoundingClientRect().bottom;
            const isVisible = metricTop < window.innerHeight - 100 && metricBottom > 0;
            
            if (isVisible) {
                metric.style.opacity = '1';
                metric.style.animationDelay = `${0.3 * index}s`;
                metric.style.animationName = 'fadeInCorporate';
                
                // Add count-up animation to metric values for dashboard effect
                setTimeout(() => {
                    const valueElem = metric.querySelector('.metric-value');
                    if (valueElem) {
                        valueElem.classList.add('counting-animation');
                    }
                }, 300 * index);
            }
        });
          // Animate app cards with staggered reveal
        const appCards = document.querySelectorAll('.app-card');
        appCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const isVisible = cardTop < window.innerHeight - 100 && cardBottom > 0;
            
            if (isVisible) {
                card.style.opacity = '1';
                card.style.animationDelay = `${0.15 * index}s`;
            }
        });
    };
    
    // Add scroll event for animation
    window.addEventListener('scroll', animateBusinessElements);
    
    // Make the Kenya map pulse with animation
    const kenyaMap = document.querySelector('.business-kenya-map');
    if (kenyaMap) {
        kenyaMap.style.animation = 'kenyanMapPulse 4s infinite ease-in-out';
    }
    
    // Trigger once for initial elements in view
    setTimeout(animateBusinessElements, 100);
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
    
    // Check if we should use custom cursor (disable on mobile/touch devices)
    const shouldUseCustomCursor = window.matchMedia('(min-width: 769px)').matches && 
                                !('ontouchstart' in window);
    
    // Set initial cursor visibility based on device
    document.body.classList.toggle('use-custom-cursor', shouldUseCustomCursor);
    cursorDot.style.display = shouldUseCustomCursor ? 'block' : 'none';
    cursorFollower.style.display = shouldUseCustomCursor ? 'block' : 'none';
    
    // If on mobile/touch device, exit early
    if (!shouldUseCustomCursor) return;
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Performance optimization flags
    let rafId = null;
    let isMoving = false;
    let lastMoveTime = 0;
      // Update cursor position with each mouse movement
    document.addEventListener('mousemove', function(e) {
        // Get accurate page-relative coordinates that account for scrolling
        mouseX = e.pageX;
        mouseY = e.pageY;
        
        // Update dot position immediately (direct positioning for reduced lag)
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        // Flag that mouse is moving
        isMoving = true;
        lastMoveTime = performance.now();
        
        // Start animation loop if not running
        if (!rafId) {
            rafId = requestAnimationFrame(updateFollower);
        }
    });
    
    // Handle window resize to ensure cursor positioning remains accurate
    window.addEventListener('resize', function() {
        // Reset follower to prevent position glitches after resize
        followerX = mouseX;
        followerY = mouseY;
        
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
    });
    
    // Handle page scroll event to ensure correct positioning
    document.addEventListener('scroll', function() {
        // Reset follower to prevent lag during scrolling
        if (cursorFollower) {
            followerX = mouseX;
            followerY = mouseY;
            
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }
    }, { passive: true });
    
    // Use requestAnimationFrame for smooth follower updates
    function updateFollower(timestamp) {
        // Calculate the distance between current follower position and mouse position
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        // Faster smoothing factor to reduce lag (0.25 instead of 0.15)
        followerX += distX * 0.25;
        followerY += distY * 0.25;
        
        // Apply position directly rather than transform for better accuracy
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        // Continue animation loop only if needed (moving or settling)
        if (isMoving || Math.abs(distX) > 0.1 || Math.abs(distY) > 0.1) {
            // Check if mouse has stopped moving for a while
            if (isMoving && timestamp - lastMoveTime > 100) {
                isMoving = false;
            }
            
            rafId = requestAnimationFrame(updateFollower);
        } else {
            rafId = null;
        }
    }
    
    // Start the animation loop
    rafId = requestAnimationFrame(updateFollower);
      // Add click effect
    document.addEventListener('mousedown', function() {
        cursorDot.classList.add('clicking');
        setTimeout(() => cursorDot.classList.remove('clicking'), 300);
    });
    
    // Handle page transition events to prevent cursor positioning issues
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // Reset cursor position when returning to the page
            setTimeout(() => {
                followerX = mouseX;
                followerY = mouseY;
                cursorFollower.style.left = `${followerX}px`;
                cursorFollower.style.top = `${followerY}px`;
            }, 100);
        }
    });
    
    // Handle page navigation - this helps with SPA navigation
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            followerX = mouseX;
            followerY = mouseY;
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }, 100);
    });
    
    // Change cursor appearance on interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-hover, a, button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorFollower.classList.add('expanded');
        });
        
        element.addEventListener('mouseleave', function() {
            cursorFollower.classList.remove('expanded');
        });
    });
}

/**
 * Handle responsive states for custom cursor
 */
function handleCustomCursorResponsive() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursorDot || !cursorFollower) return;
    
    // Check if we should use custom cursor based on screen size and device type
    const shouldUseCustomCursor = window.matchMedia('(min-width: 769px)').matches && 
                                !('ontouchstart' in window);
    
    // Update body class and cursor elements visibility
    document.body.classList.toggle('use-custom-cursor', shouldUseCustomCursor);
    cursorDot.style.display = shouldUseCustomCursor ? 'block' : 'none';
    cursorFollower.style.display = shouldUseCustomCursor ? 'block' : 'none';
}

/**
 * Mark sections as loaded to hide their loading indicators
 */
function handleSectionLoading() {
    // Mark hero section as loaded after a short delay
    setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.classList.add('loaded');
        }
    }, 1000);
    
    // Handle other sections based on visibility
    const sections = document.querySelectorAll('section');
    const markSectionAsLoaded = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    };
    
    const observer = new IntersectionObserver(markSectionAsLoaded, {
        root: null,
        threshold: 0.1 // 10% of the section visible
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}
