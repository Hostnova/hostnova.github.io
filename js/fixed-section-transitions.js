/**
 * Enhanced Section Transitions
 * Provides smooth, responsive transitions between sections with visual feedback
 */

class SectionTransitionManager {
  constructor(options = {}) {
    // Configuration
    this.options = {
      sectionSelector: options.sectionSelector || '.fullpage-section',
      navButtonSelector: options.navButtonSelector || '.section-nav-button',
      navDotSelector: options.navDotSelector || '.section-nav-dot',
      animationDuration: options.animationDuration || 800,
      scrollCooldown: options.scrollCooldown || 1200,
      showProgressIndicator: options.showProgressIndicator !== false,
      showTransitionOverlay: options.showTransitionOverlay !== false,
      useStaggeredContentAnimation: options.useStaggeredContentAnimation !== false,
      initialSectionIndex: options.initialSectionIndex || 0,
    };

    // State
    this.sections = document.querySelectorAll(this.options.sectionSelector);
    this.navButtons = document.querySelectorAll(this.options.navButtonSelector);
    this.currentSectionIndex = this.options.initialSectionIndex;
    this.isAnimating = false;
    this.lastScrollTime = 0;

    // Create UI elements
    if (this.options.showTransitionOverlay) {
      this.transitionOverlay = document.createElement('div');
      this.transitionOverlay.className = 'transition-overlay';
      document.body.appendChild(this.transitionOverlay);
    }

    if (this.options.showProgressIndicator) {
      this.progressIndicator = document.createElement('div');
      this.progressIndicator.className = 'transition-progress';
      document.body.appendChild(this.progressIndicator);
    }

    // Initialize
    this.initialize();
  }

  initialize() {
    // Initial setup
    this.sections.forEach((section, index) => {
      // Reset any transition classes to start clean
      section.classList.remove(
        'slide-enter-active', 
        'slide-enter-down-active',
        'slide-exit-active', 
        'slide-exit-up-active',
        'section-entering',
        'section-active',
        'section-exiting-up',
        'section-exiting-down'
      );
      
      if (index !== this.currentSectionIndex) {
        section.style.display = 'none';
      } else {
        section.style.display = 'flex';
        section.style.opacity = '1';
        // Add initial animation to active section
        section.classList.add('section-active');
        this.animateSectionContent(section);
      }
      
      // Create data-section-index attributes for easier reference
      section.setAttribute('data-section-index', index);
    });
    
    // Handle event listeners
    this.setupEventListeners();
    
    // Dispatch initial sectionChanged event
    const event = new CustomEvent('sectionChanged', {
      detail: { 
        fromIndex: null, 
        toIndex: this.currentSectionIndex,
        toId: this.sections[this.currentSectionIndex]?.id || null,
        sections: this.sections 
      }
    });
    document.dispatchEvent(event);
  }

  setupEventListeners() {
    // Handle wheel/scroll events
    window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
      // Handle touch events for mobile with improved sensitivity
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartX = 0; // Track horizontal movement to avoid triggering on horizontal scrolls
    let touchEndX = 0;
    let touchStartTime = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.changedTouches[0].screenY;
      touchStartX = e.changedTouches[0].screenX;
      touchStartTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      // Check if we're in cooldown period or currently animating
      const now = Date.now();
      if (this.isAnimating || now - this.lastScrollTime < this.options.scrollCooldown) {
        return;
      }
      
      touchEndY = e.changedTouches[0].screenY;
      touchEndX = e.changedTouches[0].screenX;
      const touchDuration = now - touchStartTime;
      
      const verticalDiff = touchStartY - touchEndY;
      const horizontalDiff = touchStartX - touchEndX;
      
      // Check if it's a predominantly vertical swipe (not horizontal)
      if (Math.abs(verticalDiff) > Math.abs(horizontalDiff * 1.5)) {
        // Need a significant swipe, not just a tap, and not too slow
        if (Math.abs(verticalDiff) > 70 && touchDuration < 300) {
          if (verticalDiff > 0) {
            // Swiped up, go to next section
            this.goToNextSection();
            this.lastScrollTime = now;
            e.preventDefault();
          } else {
            // Swiped down, go to previous section
            this.goToPrevSection();
            this.lastScrollTime = now;
            e.preventDefault();
          }
        }
      }
    }, { passive: false });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        this.goToNextSection();
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        this.goToPrevSection();
        e.preventDefault();
      }
    });
    
    // Handle navigation buttons
    this.navButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetSection = button.getAttribute('data-section');
        if (targetSection) {
          const targetIndex = parseInt(targetSection, 10);
          if (!isNaN(targetIndex)) {
            this.goToSection(targetIndex);
          }
        }
      });
    });
    
    // Handle section navigation links
    document.querySelectorAll('.section-nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetSection = link.getAttribute('data-section');
        if (targetSection) {
          const targetIndex = parseInt(targetSection, 10);
          if (!isNaN(targetIndex)) {
            this.goToSection(targetIndex);
          }
        }
      });
    });
  }  handleWheel(e) {
    // Only preventDefault when we're sure we'll handle the event
    // This allows internal scrolling to work naturally
    
    const now = Date.now();
    // Check if we're in cooldown period
    if (this.isAnimating || now - this.lastScrollTime < this.options.scrollCooldown) {
      return false;
    }
    
    // Check if scrolling is happening inside a scrollable container
    let target = e.target;
    
    // Check if target has internal-scroll-container class or ancestor with that class
    let isInternalScrollContainer = false;
    let currentNode = target;
    while (currentNode && currentNode !== document.body) {
      if (currentNode.classList && currentNode.classList.contains('internal-scroll-container')) {
        isInternalScrollContainer = true;
        break;
      }
      currentNode = currentNode.parentNode;
    }
    
    // If in an internal scroll container, let it handle the scroll
    if (isInternalScrollContainer) {
      return false;
    }
    
    // Continue with the regular check for scrollable elements
    while (target && target !== document.body) {
      const style = window.getComputedStyle(target);
      const isScrollable = 
        (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
        target.scrollHeight > target.clientHeight;
      
      // For horizontal scrollable containers
      const isHorizScrollable = 
        (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
        target.scrollWidth > target.clientWidth;
        
      // If element is scrollable and has room to scroll, let it handle the event
      if (isScrollable && 
          ((e.deltaY > 0 && target.scrollTop < target.scrollHeight - target.clientHeight) || 
           (e.deltaY < 0 && target.scrollTop > 0))) {
        return true; // Allow natural scrolling
      }
      
      // If horizontal scrolling is happening
      if (isHorizScrollable && 
          ((e.deltaX > 0 && target.scrollLeft < target.scrollWidth - target.clientWidth) || 
           (e.deltaX < 0 && target.scrollLeft > 0))) {
        return true; // Allow natural scrolling
      }
      
      target = target.parentElement;
    }
    
    // Now we know no scrollable element is handling this, so we prevent default
    e.preventDefault();
    
    // Use a threshold to ensure intentional scrolling and avoid accidental triggers
    const scrollThreshold = 15; // Slightly increased for more intentional scrolling
    
    // Detect scroll direction with improved sensitivity
    if (Math.abs(e.deltaY) > scrollThreshold) {
      if (e.deltaY > 0) {
        // Scroll down - with debounce
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.goToNextSection();
        }, 50); // Small timeout to debounce multiple rapid wheel events
      } else {
        // Scroll up - with debounce
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.goToPrevSection();
        }, 50);
      }
      
      // Update last scroll time
      this.lastScrollTime = now;
    }
    
    return false;
  }

  goToNextSection() {
    const nextIndex = this.currentSectionIndex + 1;
    if (nextIndex < this.sections.length) {
      this.goToSection(nextIndex, 'down');
    }
  }

  goToPrevSection() {
    const prevIndex = this.currentSectionIndex - 1;
    if (prevIndex >= 0) {
      this.goToSection(prevIndex, 'up');
    }
  }  goToSection(index, direction = null) {
    // Prevent invalid indices
    if (index < 0 || index >= this.sections.length || this.isAnimating) {
      return false;
    }
    
    // Check if it's the same section, only return if not clicking on nav buttons
    if (index === this.currentSectionIndex) {
      const isClickEvent = new Error().stack.includes('addEventListener');
      if (!isClickEvent) return false;
    }
    
    // Determine direction if not specified
    if (!direction) {
      direction = index > this.currentSectionIndex ? 'down' : 'up';
    }
    
    // Set animating flag and lock scroll
    this.isAnimating = true;
    document.body.classList.add('section-transition-active');
    
    // Get sections
    const currentSection = this.sections[this.currentSectionIndex];
    const targetSection = this.sections[index];
    const fromIndex = this.currentSectionIndex;
    
    // Show overlay during transition if enabled
    if (this.options.showTransitionOverlay && this.transitionOverlay) {
      this.transitionOverlay.style.opacity = '0.2';
    }
    
    // Show progress indicator if enabled
    if (this.options.showProgressIndicator && this.progressIndicator) {
      this.progressIndicator.style.width = '0';
      this.progressIndicator.style.opacity = '1';
      
      // Animate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 3;
        this.progressIndicator.style.width = `${progress}%`;
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            this.progressIndicator.style.opacity = '0';
          }, 200);
        }
      }, 10);
    }
    
    // Apply transition classes
    if (direction === 'down') {
      // Current section exits up, target comes from below
      currentSection.classList.add('slide-exit-up-active');
      targetSection.classList.add('slide-enter-active');
    } else {
      // Current section exits down, target comes from above
      currentSection.classList.add('slide-exit-active');
      targetSection.classList.add('slide-enter-down-active');
    }
    
    // Show target section
    targetSection.style.display = 'flex';
    
    // Update position and animation after a brief delay
    setTimeout(() => {
      this.animateSectionContent(targetSection);
    }, 50);
      // After animation completes
    setTimeout(() => {
      // Hide previous section
      currentSection.style.display = 'none';
      
      // Update classes
      currentSection.classList.remove('section-active', 'slide-exit-active', 'slide-exit-up-active');
      targetSection.classList.remove('slide-enter-active', 'slide-enter-down-active');
      targetSection.classList.add('section-active');
      
      // Hide overlay
      if (this.options.showTransitionOverlay && this.transitionOverlay) {
        this.transitionOverlay.style.opacity = '0';
      }
      
      // Update current index
      this.currentSectionIndex = index;
      
      // Release animation lock and unlock scroll
      setTimeout(() => {
        this.isAnimating = false;
        document.body.classList.remove('section-transition-active');
      }, 100); // Small buffer to ensure animations are fully complete
      
      // Update URL hash if section has ID
      if (targetSection.id) {
        window.history.replaceState(null, null, `#${targetSection.id}`);
      }
      
      // Dispatch event for other components to react
      const event = new CustomEvent('sectionChanged', {
        detail: {
          fromIndex: fromIndex,
          toIndex: index,
          toId: targetSection.id || null,
          sections: this.sections,
          direction: direction
        }
      });
      document.dispatchEvent(event);
    }, this.options.animationDuration);
    
    return true;
  }

  // Helper method to animate content within sections
  animateSectionContent(section) {
    if (!this.options.useStaggeredContentAnimation) return;
    
    const animatableElements = section.querySelectorAll('.animate-on-section-enter');
    
    // Stagger animations for child elements
    animatableElements.forEach((element, i) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 + (i * 100));
    });
  }

  // Public method to get current section index
  getCurrentSectionIndex() {
    return this.currentSectionIndex;
  }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
  // Export to global scope for other scripts to use
  window.sectionTransitionManager = new SectionTransitionManager({
    sectionSelector: '.fullpage-section',
    navButtonSelector: '.section-nav-button',
    navDotSelector: '.section-nav-dot',
    animationDuration: 850, // Slightly increased for smoother transitions
    scrollCooldown: 1000, // Reduced for more responsive scrolling
    initialSectionIndex: 0,
    showProgressIndicator: true,
    showTransitionOverlay: true,
    useStaggeredContentAnimation: true
  });
  
  // Log initialization
  console.log('Section transition manager initialized with optimized settings');
  
  // Force update section navigation buttons once after initialization
  setTimeout(() => {
    if (window.updateSectionNavButtons) {
      window.updateSectionNavButtons();
    }
  }, 500);
});
