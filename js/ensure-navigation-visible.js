/**
 * Section Navigation Visibility Fix
 * This script runs after a delay to ensure the section navigation is always visible
 * and fixes any issues with the section navigation dots
 */

(function() {
  // Function to ensure section navigation is visible and clickable
  function ensureSectionNavigationWorks() {
    const navContainer = document.querySelector('.section-nav-container');
    const navButtons = document.querySelectorAll('.section-nav-button');
    
    if (navContainer) {
      // Force high z-index and visibility
      navContainer.style.zIndex = '9999';
      navContainer.style.visibility = 'visible';
      navContainer.style.opacity = '1';
      navContainer.style.pointerEvents = 'auto';
      
      // Add an outline for better visibility if needed
      navContainer.style.boxShadow = '0 0 15px rgba(65, 214, 255, 0.3)';
    }
    
    if (navButtons && navButtons.length) {
      navButtons.forEach(button => {
        // Ensure each button is clickable
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
        button.style.zIndex = '10000';
        
        // Reconnect event listeners if needed
        if (!button.hasAttribute('visibility-fix-added')) {
          button.setAttribute('visibility-fix-added', 'true');
          
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const sectionIndex = parseInt(button.getAttribute('data-section'), 10);
            if (!isNaN(sectionIndex) && window.sectionTransitionManager) {
              window.sectionTransitionManager.goToSection(sectionIndex);
              console.log(`Navigation clicked for section ${sectionIndex}`);
              
              // Update active states
              navButtons.forEach(btn => btn.classList.remove('active'));
              button.classList.add('active');
            }
          });
        }
      });
    }
  }
  
  // Run the fix after a delay to ensure all scripts are loaded
  setTimeout(ensureSectionNavigationWorks, 1000);
  
  // Also run after each section change
  document.addEventListener('sectionChanged', function() {
    setTimeout(ensureSectionNavigationWorks, 100);
  });
  
  // Run periodically to ensure continuous functionality
  setInterval(ensureSectionNavigationWorks, 5000);
})();
