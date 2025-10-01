/**
 * SCROLL EFFECTS & ANIMATIONS
 * Handles scroll-triggered animations, parallax, and Intersection Observer
 * Based on WEBSITE_DESIGN_SPEC.md
 */

(function() {
  'use strict';

  // ========================================
  // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ========================================
  
  const initScrollAnimations = () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show all elements immediately if user prefers reduced motion
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '1';
      });
      return;
    }
    
    // Create intersection observer
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.getAttribute('data-animate');
          const delay = element.getAttribute('data-animate-delay') || '0';
          
          // Add animation with delay
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.animation = `${getAnimationName(animationType)} 0.6s var(--ease-smooth) forwards`;
          }, parseInt(delay));
          
          // Unobserve after animation
          observer.unobserve(element);
        }
      });
    }, observerOptions);
    
    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  };
  
  // Helper function to map animation types to keyframe names
  const getAnimationName = (type) => {
    const animationMap = {
      'fade-in': 'fadeIn',
      'fade-up': 'fadeInUp',
      'fade-down': 'fadeInDown',
      'fade-left': 'fadeInLeft',
      'fade-right': 'fadeInRight',
      'scale-in': 'scaleIn'
    };
    
    return animationMap[type] || 'fadeIn';
  };
  
  // ========================================
  // PARALLAX SCROLL EFFECT
  // ========================================
  
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    let ticking = false;
    
    const updateParallax = () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
        const elementTop = el.offsetTop;
        const elementHeight = el.offsetHeight;
        
        // Only apply parallax if element is in viewport
        if (scrollY + window.innerHeight > elementTop && scrollY < elementTop + elementHeight) {
          const yPos = (scrollY - elementTop) * speed;
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
  };
  
  // ========================================
  // SCROLL PROGRESS INDICATOR
  // ========================================
  
  const initScrollProgress = () => {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) return;
    
    let ticking = false;
    
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / documentHeight) * 100;
      
      progressBar.style.width = `${scrollPercentage}%`;
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    
    // Initial update
    updateProgress();
  };
  
  // ========================================
  // REVEAL ON SCROLL (Alternative method)
  // ========================================
  
  const initRevealOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
  };
  
  // ========================================
  // LAZY LOAD IMAGES
  // ========================================
  
  const initLazyLoad = () => {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    } else {
      // Fallback to Intersection Observer
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  };
  
  // ========================================
  // SCROLL TO TOP BUTTON
  // ========================================
  
  const initScrollToTop = () => {
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollTopBtn) return;
    
    let ticking = false;
    
    const toggleButton = () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
        scrollTopBtn.setAttribute('aria-hidden', 'false');
      } else {
        scrollTopBtn.classList.remove('visible');
        scrollTopBtn.setAttribute('aria-hidden', 'true');
      }
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(toggleButton);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  // ========================================
  // STAGGER ANIMATION FOR LISTS
  // ========================================
  
  const initStaggerAnimation = () => {
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    if (staggerContainers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.children;
          const staggerDelay = parseInt(entry.target.getAttribute('data-stagger')) || 100;
          
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('stagger-in');
            }, index * staggerDelay);
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    staggerContainers.forEach(container => observer.observe(container));
  };
  
  // ========================================
  // COUNT UP ANIMATION FOR NUMBERS
  // ========================================
  
  const initCountUp = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-count'));
          const duration = parseInt(element.getAttribute('data-duration')) || 2000;
          const suffix = element.getAttribute('data-suffix') || '';
          
          animateCount(element, 0, target, duration, suffix);
          observer.unobserve(element);
        }
      });
    });
    
    counters.forEach(counter => observer.observe(counter));
  };
  
  const animateCount = (element, start, end, duration, suffix) => {
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      element.textContent = current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = end.toLocaleString() + suffix;
      }
    };
    
    requestAnimationFrame(updateCount);
  };
  
  // ========================================
  // INITIALIZE ALL SCROLL EFFECTS
  // ========================================
  
  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initParallax();
        initScrollProgress();
        initRevealOnScroll();
        initLazyLoad();
        initScrollToTop();
        initStaggerAnimation();
        initCountUp();
      });
    } else {
      initScrollAnimations();
      initParallax();
      initScrollProgress();
      initRevealOnScroll();
      initLazyLoad();
      initScrollToTop();
      initStaggerAnimation();
      initCountUp();
    }
  };
  
  // Initialize
  init();
  
  // Export for external use
  window.HostaraScroll = {
    init
  };
  
})();
