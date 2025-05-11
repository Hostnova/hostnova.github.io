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
      if (index !== this.currentSectionIndex) {
        section.style.display = 'none';
      } else {
        // Add initial animation to active section
        if (this.options.useStaggeredContentAnimation) {
          this.animateSectionContent(section);
        }
      }
    });

    // Update active dot
    this.updateActiveDot(this.currentSectionIndex);

    // Add event listeners
    this.addEventListeners();
  }

  addEventListeners() {
    // Navigation button clicks
    this.navButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.transitionToSection(this.currentSectionIndex, index);
      });
    });

    // Wheel events for scrolling
    document.addEventListener('wheel', (event) => {
      const now = Date.now();
      if (this.isAnimating || now - this.lastScrollTime < this.options.scrollCooldown) return;
      
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = this.currentSectionIndex + direction;
      
      // Ensure next index is within bounds
      if (nextIndex >= 0 && nextIndex < this.sections.length) {
        if (this.transitionToSection(this.currentSectionIndex, nextIndex)) {
          this.lastScrollTime = now;
        }
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
      if (this.isAnimating) return;
      
      let nextIndex = this.currentSectionIndex;
      
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        nextIndex = Math.min(this.sections.length - 1, this.currentSectionIndex + 1);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        nextIndex = Math.max(0, this.currentSectionIndex - 1);
      } else {
        return;
      }
      
      if (nextIndex !== this.currentSectionIndex) {
        this.transitionToSection(this.currentSectionIndex, nextIndex);
      }
    });

    // Touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;

    document.addEventListener('touchstart', (event) => {
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (this.isAnimating || now - this.lastScrollTime < this.options.scrollCooldown) return;
      
      touchEndY = event.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) < minSwipeDistance) return;
      
      const direction = diff > 0 ? 1 : -1; // positive = swipe up (next), negative = swipe down (prev)
      const nextIndex = this.currentSectionIndex + direction;
      
      if (nextIndex >= 0 && nextIndex < this.sections.length) {
        if (this.transitionToSection(this.currentSectionIndex, nextIndex)) {
          this.lastScrollTime = now;
        }
      }
    }, { passive: true });
  }

  transitionToSection(fromIndex, toIndex) {
    if (this.isAnimating || fromIndex === toIndex) return false;
    
    this.isAnimating = true;
    const direction = toIndex > fromIndex ? 1 : -1;
    
    // Flash transition overlay for smoother experience
    if (this.options.showTransitionOverlay) {
      this.transitionOverlay.classList.add('active');
    }
    
    // Show progress indicator
    if (this.options.showProgressIndicator) {
      this.progressIndicator.style.width = '0%';
      this.progressIndicator.style.opacity = '1';
      
      // Animate progress
      const startTime = performance.now();
      const animateProgress = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / this.options.animationDuration, 1);
        this.progressIndicator.style.width = `${progress * 100}%`;
        
        if (progress < 1) {
          requestAnimationFrame(animateProgress);
        } else {
          setTimeout(() => {
            this.progressIndicator.style.opacity = '0';
          }, 200);
        }
      };
      requestAnimationFrame(animateProgress);
    }
    
    // Current section exit transition
    this.sections[fromIndex].classList.add(direction > 0 ? 'slide-exit-active' : 'slide-exit-up-active');
    
    setTimeout(() => {
      this.sections[fromIndex].style.display = 'none';
      this.sections[fromIndex].classList.remove(
        'slide-exit-active', 
        'slide-exit-up-active'
      );
      
      // Next section enter transition
      this.sections[toIndex].style.display = 'flex';
      this.sections[toIndex].classList.add(direction > 0 ? 'slide-enter-active' : 'slide-enter-down-active');
      
      // Apply staggered animations to content
      if (this.options.useStaggeredContentAnimation) {
        this.animateSectionContent(this.sections[toIndex]);
      }
      
      this.currentSectionIndex = toIndex;
      this.updateActiveDot(this.currentSectionIndex);

      // Call the section-specific initialization function if it exists
      this.callSectionInitFunction(this.sections[toIndex]);
      
      // Remove transition overlay
      if (this.options.showTransitionOverlay) {
        setTimeout(() => {
          this.transitionOverlay.classList.remove('active');
        }, this.options.animationDuration / 2);
      }
      
      setTimeout(() => {
        this.sections[this.currentSectionIndex].classList.remove(
          'slide-enter-active', 
          'slide-enter-down-active'
        );
        this.isAnimating = false;
      }, this.options.animationDuration);
    }, this.options.animationDuration);
    
    return true;
  }

  updateActiveDot(index) {
    this.navButtons.forEach((btn, i) => {
      const dot = btn.querySelector(this.options.navDotSelector);
      if (!dot) return;
      
      if (i === index) {
        dot.classList.add('active');
        // Pulse animation for active dot
        dot.animate([
          { transform: 'scale(1.2)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 }
        ], {
          duration: 300,
          easing: 'ease-out'
        });
      } else {
        dot.classList.remove('active');
      }
    });
  }

  animateSectionContent(section) {
    const contentElements = section.querySelectorAll('.section-content > *');
    contentElements.forEach((el, i) => {
      el.style.setProperty('--item-index', i);
    });
  }

  callSectionInitFunction(section) {
    // Call section-specific initialization function if available
    const sectionId = section.id;
    if (sectionId === 'business') {
      if (typeof window.initializeBusinessSection === 'function') {
        window.initializeBusinessSection();
      }
    }
    // Add more section-specific initializations as needed
  }

  // Public API
  goToSection(index) {
    if (index >= 0 && index < this.sections.length) {
      return this.transitionToSection(this.currentSectionIndex, index);
    }
    return false;
  }

  next() {
    const nextIndex = this.currentSectionIndex + 1;
    if (nextIndex < this.sections.length) {
      return this.transitionToSection(this.currentSectionIndex, nextIndex);
    }
    return false;
  }

  prev() {
    const prevIndex = this.currentSectionIndex - 1;
    if (prevIndex >= 0) {
      return this.transitionToSection(this.currentSectionIndex, prevIndex);
    }
    return false;
  }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
  // Export to global scope for other scripts to use
  window.sectionTransitionManager = new SectionTransitionManager({
    sectionSelector: '#hero, .hostara-section, #business',
    navButtonSelector: '.section-nav-button',
    navDotSelector: '.section-nav-dot',
    animationDuration: 800,
    scrollCooldown: 1200,
    initialSectionIndex: 0
  });
});
