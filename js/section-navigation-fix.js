/**
 * Section Navigation Fix
 * This script enhances the section navigation to ensure Business and Pricing sections 
 * are properly accessible and implements optimized scrolling behavior
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Function to update section navigation buttons to match the current sections
   */
  window.updateSectionNavButtons = function() {
    const sections = document.querySelectorAll('.fullpage-section');
    const navButtons = document.querySelectorAll('.section-nav-button');
    
    if (!sections.length || !navButtons.length) return;
    
    // Make sure each section has a data-section-index attribute
    sections.forEach((section, index) => {
      section.setAttribute('data-section-index', index);
    });
    
    // Add event listeners to navigation buttons if not already added
    navButtons.forEach((button, index) => {
      if (!button.hasAttribute('data-section-handler-added')) {
        button.setAttribute('data-section-handler-added', 'true');
        
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const sectionIndex = parseInt(button.getAttribute('data-section'), 10);
          if (!isNaN(sectionIndex) && window.sectionTransitionManager) {
            window.sectionTransitionManager.goToSection(sectionIndex);
            
            // Update active class on buttons
            navButtons.forEach(btn => {
              btn.classList.remove('active');
              btn.querySelector('.section-nav-dot')?.classList.remove('active');
            });
            
            button.classList.add('active');
            button.querySelector('.section-nav-dot')?.classList.add('active');
          }
        });
      }
    });
    
    // Update button active states based on current section
    if (window.sectionTransitionManager) {
      const currentIndex = window.sectionTransitionManager.getCurrentSectionIndex();
      
      navButtons.forEach((button, index) => {
        const buttonDot = button.querySelector('.section-nav-dot');
        
        if (index === currentIndex) {
          button.classList.add('active');
          if (buttonDot) buttonDot.classList.add('active');
        } else {
          button.classList.remove('active');
          if (buttonDot) buttonDot.classList.remove('active');
        }
      });
    }
  };
  
  /**
   * Enhanced drag to scroll functionality for horizontal scrolling containers
   */
  function addDragToScroll(container) {
    if (!container) return;
    
    let isDragging = false;
    let startX, scrollLeft;
    
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
      isDragging = false;
      container.classList.remove('dragging');
    });
    
    container.addEventListener('mouseup', () => {
      isDragging = false;
      container.classList.remove('dragging');
    });
    
    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Speed multiplier
      container.scrollLeft = scrollLeft - walk;
    });
  }
  
  /**
   * Optimize cursor movement with requestAnimationFrame
   */
  function optimizeCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursorDot || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let followerX = 0, followerY = 0;
    
    // Use requestAnimationFrame for smoother cursor movement
    function animateCursor() {
      // Smooth interpolation for the cursor dot
      dotX += (mouseX - dotX) * 0.8;
      dotY += (mouseY - dotY) * 0.8;
      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      
      // Smooth interpolation for the cursor follower with slight delay
      followerX += (mouseX - followerX) * 0.3; // Slower follow speed
      followerY += (mouseY - followerY) * 0.3;
      cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      
      requestAnimationFrame(animateCursor);
    }
    
    // Throttled mouse move handler
    let lastMove = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastMove > 10) { // Limit to 100 updates per second
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMove = now;
      }
    });
    
    // Start the animation loop
    requestAnimationFrame(animateCursor);
  }
  
  /**
   * Fix section scrolling - ensure proper internal vs external scrolling
   */
  function fixSectionScrolling() {
    // Handle wheel event in the fixed-section-transitions.js's handleWheel method
    // This is already implemented in the SectionTransitionManager class
    
    // Add class to containers that should have internal scrolling
    document.querySelectorAll('.client-visual-stats, .testimonial-container').forEach(container => {
      container.classList.add('internal-scroll-container');
      container.classList.add('allow-scroll');
    });
  }
  
  // Fix business and pricing sections not being accessible
  function fixSectionAccessibility() {
    // Ensure all sections are properly marked with fullpage-section class
    const sections = document.querySelectorAll('section');
    const sectionIds = ['hero', 'hostara', 'clients', 'business', 'pricing'];
    
    // Add fullpage-section class to all main sections
    sections.forEach(section => {
      const id = section.getAttribute('id');
      if (sectionIds.includes(id) && !section.classList.contains('fullpage-section')) {
        section.classList.add('fullpage-section');
        console.log(`Added fullpage-section class to ${id} section`);
      }
    });
    
    // Specifically check for business and pricing sections
    const businessSection = document.getElementById('business');
    const pricingSection = document.getElementById('pricing');
    
    if (businessSection && !businessSection.classList.contains('fullpage-section')) {
      businessSection.classList.add('fullpage-section');
    }
    
    if (pricingSection && !pricingSection.classList.contains('fullpage-section')) {
      pricingSection.classList.add('fullpage-section');
    }
    
    // Force update section navigation buttons
    setTimeout(() => {
      window.updateSectionNavButtons();
    }, 500);
  }
  // Initialize all fixes
  function initAllFixes() {
    // Add internal-scroll-container class to scrollable elements
    document.querySelectorAll('.client-visual-stats, .testimonial-container').forEach(container => {
      container.classList.add('internal-scroll-container');
      container.classList.add('allow-scroll');
      addDragToScroll(container);
    });
    
    // Optimize cursor movement
    optimizeCursor();
    
    // Fix section scrolling behavior
    fixSectionScrolling();
    
    // Fix section accessibility
    fixSectionAccessibility();
    
    // Initial update of navigation buttons
    window.updateSectionNavButtons();
    
    // Listen for section changes to update navigation
    document.addEventListener('sectionChanged', window.updateSectionNavButtons);
    
    console.log("Section navigation and scrolling fixes applied");
  }

  // Run initialization after a brief delay to ensure other scripts are loaded
  setTimeout(initAllFixes, 500);
});
