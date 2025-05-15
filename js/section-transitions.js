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
      // Reset any transition classes to start clean      section.classList.remove(
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
        if (this.options.useStaggeredContentAnimation) {
          this.animateSectionContent(section);
        }
      }
    });

    // Update active dot
    this.updateActiveDot(this.currentSectionIndex);

    // Add event listeners
    this.addEventListeners();
    
    // Broadcast initial section
    const event = new CustomEvent('sectionChanged', { 
      detail: { fromIndex: null, toIndex: this.currentSectionIndex, sections: this.sections }
    });
    document.dispatchEvent(event);
  }

  addEventListeners() {
    // Navigation button clicks
    this.navButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.transitionToSection(this.currentSectionIndex, index);
      });
    });

    // Wheel events for scrolling with throttling for smoother experience
    let wheelThrottleTimeout = null;
    document.addEventListener('wheel', (event) => {
      if (wheelThrottleTimeout !== null) return;
      
      const now = Date.now();
      if (this.isAnimating || now - this.lastScrollTime < this.options.scrollCooldown) return;
      
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = this.currentSectionIndex + direction;
      
      // Ensure next index is within bounds
      if (nextIndex >= 0 && nextIndex < this.sections.length) {
        if (this.transitionToSection(this.currentSectionIndex, nextIndex)) {
          this.lastScrollTime = now;
          // Add throttling to prevent excessive event triggers
          wheelThrottleTimeout = setTimeout(() => {
            wheelThrottleTimeout = null;
          }, 50); // Short throttle time
        }
      }
    }, { passive: true });

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

    // Handle section navigation link clicks
    const sectionNavLinks = document.querySelectorAll('.section-nav-link');
    sectionNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionIndex = parseInt(link.getAttribute('data-section'));
        if (!isNaN(sectionIndex) && sectionIndex !== this.currentSectionIndex) {
          this.transitionToSection(this.currentSectionIndex, sectionIndex);
        }
      });
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
    
    // Listen for URL hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1); // Remove the # character
      if (hash) {
        // Find section with matching ID
        const targetSection = document.getElementById(hash);
        if (targetSection) {
          const targetIndex = Array.from(this.sections).indexOf(targetSection);
          if (targetIndex !== -1 && targetIndex !== this.currentSectionIndex) {
            this.transitionToSection(this.currentSectionIndex, targetIndex);
          }
        }
      }
    });
  }

  transitionToSection(fromIndex, toIndex) {
    if (this.isAnimating || fromIndex === toIndex) return false;
    
    this.isAnimating = true;
    const direction = toIndex > fromIndex ? 1 : -1;
    
    // Update URL hash for better browser history support
    if (this.sections[toIndex].id) {
      history.replaceState(null, null, `#${this.sections[toIndex].id}`);
    }
    
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
    
    // Make sure both sections are in a clean state before transition
    this.sections.forEach(section => {
      section.classList.remove(
        'slide-enter-active', 
        'slide-enter-down-active',
        'slide-exit-active', 
        'slide-exit-up-active'
      );
    });
    
    // Pre-display the next section in the background but invisible
    // This allows the browser to prepare the layout
    if (this.sections[toIndex].style.display === 'none') {
      this.sections[toIndex].style.opacity = '0';
      this.sections[toIndex].style.display = 'flex';
      this.sections[toIndex].style.position = 'absolute';
      this.sections[toIndex].style.zIndex = '1';

      // Force a reflow to ensure display property is applied
      void this.sections[toIndex].offsetHeight;
    }
    
    // Current section exit transition
    this.sections[fromIndex].style.position = 'relative';
    this.sections[fromIndex].style.zIndex = '2';
    this.sections[fromIndex].classList.add(direction > 0 ? 'slide-exit-active' : 'slide-exit-up-active');
    
    // Important: Properly time the transition with requestAnimationFrame for smoother execution
    requestAnimationFrame(() => {
      setTimeout(() => {
        // Reset the exiting section
        this.sections[fromIndex].style.display = 'none';
        this.sections[fromIndex].style.position = '';
        this.sections[fromIndex].style.zIndex = '';
        this.sections[fromIndex].classList.remove(
          'slide-exit-active', 
          'slide-exit-up-active'
        );
        
        // Prepare the entering section
        this.sections[toIndex].style.opacity = '1';
        this.sections[toIndex].style.position = 'relative';
        this.sections[toIndex].style.zIndex = '10';
        this.sections[toIndex].classList.add(direction > 0 ? 'slide-enter-active' : 'slide-enter-down-active');
        
        // Apply staggered animations to content
        if (this.options.useStaggeredContentAnimation) {
          this.animateSectionContent(this.sections[toIndex]);
        }
        
        this.currentSectionIndex = toIndex;
        this.updateActiveDot(this.currentSectionIndex);
        
        // Broadcast event for other scripts to respond to section change
        this.handleSectionChange(fromIndex, toIndex);

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
          
          // Final cleanup of styles to prevent conflicts
          this.sections[toIndex].style.position = '';
          this.sections[toIndex].style.zIndex = '';
        }, this.options.animationDuration);
      }, 50); // Short delay to ensure CSS transitions trigger properly
    });
    
    return true;
  }

  handleSectionChange(fromIndex, toIndex) {
    // Special handling for pricing section transitions
    if (this.sections[toIndex].id === 'pricing') {
      // Create a custom event for pricing section activation
      const pricingEvent = new CustomEvent('pricingSectionActivated');
      document.dispatchEvent(pricingEvent);
      
      // Add special effects when entering the pricing section
      const pricingSection = this.sections[toIndex];
      const pricingPlans = pricingSection.querySelectorAll('.pricing-plan');
      const pricingHeader = pricingSection.querySelector('.pricing-header');
      
      // Reset any previous animations first
      if (pricingHeader) {
        pricingHeader.style.opacity = '0';
        pricingHeader.style.transform = 'translateY(-20px)';
      }
      
      pricingPlans.forEach(plan => {
        plan.style.opacity = '0';
        plan.style.transform = 'translateY(40px)';
      });
      
      // Animate pricing header first
      if (pricingHeader) {
        setTimeout(() => {
          pricingHeader.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
          pricingHeader.style.opacity = '1';
          pricingHeader.style.transform = 'translateY(0)';
        }, 300);
      }
      
      // Then animate pricing plans with staggered delay
      setTimeout(() => {
        pricingPlans.forEach((plan, index) => {
          setTimeout(() => {
            plan.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
            plan.style.opacity = '1';
            plan.style.transform = 'translateY(0)';
          }, 500 + (index * 200)); // Stagger the animations
        });
      }, 500);
    }
    
    // Additional event dispatching with section IDs
    const event = new CustomEvent('sectionChanged', {
      detail: {
        fromIndex: fromIndex,
        toIndex: toIndex,
        fromId: this.sections[fromIndex]?.id || null,
        toId: this.sections[toIndex]?.id || null,
        sections: this.sections
      }
    });
    
    document.dispatchEvent(event);
  }

  updateActiveDot(index) {
    this.navButtons.forEach((btn, i) => {
      const dot = btn.querySelector(this.options.navDotSelector);
      if (!dot) return;
      
      if (i === index) {
        dot.classList.add('active');
        btn.classList.add('active');
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
        btn.classList.remove('active');
      }
    });
  }

  animateSectionContent(section) {
    const contentElements = section.querySelectorAll('.section-content > *');
    contentElements.forEach((el, i) => {
      el.style.setProperty('--item-index', i);
      el.classList.add('animate-text-element');
      // Add staggered delay for smoother entry
      el.style.transitionDelay = `${0.1 * i}s`;
      
      // Ensure visibility after animation
      setTimeout(() => {
        el.classList.add('visible');
      }, 100 + (i * 100));
    });
  }
  callSectionInitFunction(section) {
    // Call section-specific initialization function if available
    const sectionId = section.id;
    if (sectionId === 'business') {
      if (typeof window.initializeBusinessSection === 'function') {
        window.initializeBusinessSection();
      }
    } else if (sectionId === 'clients') {
      if (typeof window.initializeClientSection === 'function') {
        window.initializeClientSection();
      }
    } else if (sectionId === 'hostara') {
      if (typeof window.initializeHostaraSection === 'function') {
        window.initializeHostaraSection();
      }
    } else if (sectionId === 'pricing') {
      if (typeof window.initializePricingSection === 'function') {
        window.initializePricingSection();
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
    animationDuration: 800,
    scrollCooldown: 1200,
    initialSectionIndex: 0
  });
});
