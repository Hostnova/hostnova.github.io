/**
 * HOSTARA HERO PAGE - ANIMATIONS ENGINE
 * Orchestrates entrance sequences, counter animations, and interactive effects
 * Kenya-optimized: Lightweight, performance-focused
 */

(function() {
  'use strict';
  
  // ===========================================
  // CONFIGURATION
  // ===========================================
  
  const CONFIG = {
    counters: {
      businesses: { start: 0, end: 5000, duration: 2000, suffix: '+' },
      customers: { start: 0, end: 50000, duration: 2500, suffix: '+' },
      categories: { start: 0, end: 8, duration: 1500, suffix: '' }
    },
    entranceDelay: 100, // Time before starting entrance sequence
    parallaxSpeed: 0.3,
    reduceMotion: false
  };
  
  // ===========================================
  // STATE
  // ===========================================
  
  let animationsInitialized = false;
  let countersAnimated = false;
  let lastScrollY = 0;
  
  // ===========================================
  // INITIALIZATION
  // ===========================================
  
  function init() {
    // Check for reduced motion preference
    CONFIG.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (CONFIG.reduceMotion) {
      // Show all elements immediately if reduced motion
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '1';
      });
      document.querySelector('.hero-page')?.classList.add('loaded');
      return;
    }
    
    // Start entrance sequence
    setTimeout(() => {
      startEntranceSequence();
    }, CONFIG.entranceDelay);
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize scroll indicator
    initScrollIndicator();
    
    // Initialize phone mockup 3D tilt
    initPhoneTilt();
    
    animationsInitialized = true;
  }
  
  // ===========================================
  // ENTRANCE SEQUENCE
  // ===========================================
  
  function startEntranceSequence() {
    const heroPage = document.querySelector('.hero-page');
    if (!heroPage) return;
    
    // Add loaded class to trigger CSS animations
    heroPage.classList.add('loaded');
    
    // Animate features with stagger
    animateFeatures();
    
    // Start counter animations after content appears
    setTimeout(() => {
      if (!countersAnimated) {
        animateCounters();
      }
    }, 1400); // After trust indicators appear
  }
  
  function animateFeatures() {
    const features = document.querySelectorAll('.hero-feature');
    
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.opacity = '1';
      }, 900 + (index * 100)); // Stagger 100ms apart
    });
  }
  
  // ===========================================
  // COUNTER ANIMATIONS
  // ===========================================
  
  function initCounterAnimations() {
    // Use Intersection Observer to trigger when trust section visible
    const trustSection = document.querySelector('.hero-trust');
    if (!trustSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(trustSection);
  }
  
  function animateCounters() {
    countersAnimated = true;
    
    const counterElements = {
      businesses: document.querySelector('[data-count="5000"]'),
      customers: document.querySelector('[data-count="50000"]'),
      categories: document.querySelector('[data-count="8"]')
    };
    
    Object.keys(CONFIG.counters).forEach(key => {
      const element = counterElements[key];
      const config = CONFIG.counters[key];
      
      if (element) {
        animateCounter(element, config);
      }
    });
  }
  
  function animateCounter(element, config) {
    const { start, end, duration, suffix } = config;
    const startTime = performance.now();
    
    element.classList.add('counting');
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(start + (end - start) * easeProgress);
      
      // Format number with commas for readability
      element.textContent = formatNumber(current) + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.classList.remove('counting');
        element.classList.add('complete');
        element.textContent = formatNumber(end) + suffix;
      }
    }
    
    requestAnimationFrame(update);
  }
  
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  // ===========================================
  // PARALLAX EFFECTS
  // ===========================================
  
  function initParallaxEffects() {
    if (CONFIG.reduceMotion) return;
    
    const phoneMockup = document.querySelector('.hero-phone-mockup');
    const orbs = document.querySelectorAll('.hero-gradient-orb');
    
    if (!phoneMockup && orbs.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax(phoneMockup, orbs);
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  function updateParallax(phoneMockup, orbs) {
    const scrollPercent = lastScrollY / window.innerHeight;
    
    // Phone mockup parallax (moves slower than scroll)
    if (phoneMockup) {
      const phoneOffset = lastScrollY * CONFIG.parallaxSpeed;
      phoneMockup.style.transform = `translateY(${phoneOffset}px)`;
    }
    
    // Orbs parallax (move in different directions)
    orbs.forEach((orb, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.2 + (index * 0.1);
      const offset = lastScrollY * speed * direction;
      orb.style.transform = `translate(${offset}px, ${offset * 0.5}px)`;
    });
  }
  
  // ===========================================
  // SCROLL INDICATOR
  // ===========================================
  
  function initScrollIndicator() {
    const scrollLink = document.querySelector('.hero-scroll-link');
    if (!scrollLink) return;
    
    scrollLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Smooth scroll to next section (or index.html if hero is standalone)
      const nextSection = document.querySelector('#about, #features');
      
      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // If no next section, go to main site
        window.location.href = '/index.html';
      }
    });
    
    // Hide indicator when scrolled down
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollLink.style.opacity = '0';
        scrollLink.style.pointerEvents = 'none';
      } else {
        scrollLink.style.opacity = '1';
        scrollLink.style.pointerEvents = 'auto';
      }
    });
  }
  
  // ===========================================
  // PHONE MOCKUP 3D TILT
  // ===========================================
  
  function initPhoneTilt() {
    if (CONFIG.reduceMotion) return;
    
    const phoneMockup = document.querySelector('.hero-phone-mockup');
    if (!phoneMockup) return;
    
    // Only enable on desktop (hover-capable devices)
    if (window.matchMedia('(hover: hover)').matches) {
      phoneMockup.addEventListener('mousemove', handlePhoneTilt);
      phoneMockup.addEventListener('mouseleave', resetPhoneTilt);
    }
  }
  
  function handlePhoneTilt(e) {
    const phone = e.currentTarget;
    const rect = phone.getBoundingClientRect();
    
    // Calculate mouse position relative to element center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    phone.style.transform = `
      translateY(-5px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale(1.02)
    `;
  }
  
  function resetPhoneTilt(e) {
    const phone = e.currentTarget;
    phone.style.transform = '';
  }
  
  // ===========================================
  // PERFORMANCE MONITORING
  // ===========================================
  
  function logPerformanceMetrics() {
    if (!window.performance) return;
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('🎯 Hero Page Performance:', {
          'Total Load Time': `${pageLoadTime}ms`,
          'Server Response': `${connectTime}ms`,
          'DOM Render': `${renderTime}ms`,
          'Target': '<3000ms (3G network)'
        });
        
        // Track with analytics if available
        if (window.HostaraAnalytics && typeof window.HostaraAnalytics.trackEvent === 'function') {
          window.HostaraAnalytics.trackEvent('hero_performance', {
            load_time: pageLoadTime,
            render_time: renderTime
          });
        }
      }, 0);
    });
  }
  
  // ===========================================
  // CTA BUTTON ENHANCEMENTS
  // ===========================================
  
  function initCTAEnhancements() {
    const ctaButtons = document.querySelectorAll('.hero-cta .btn');
    
    ctaButtons.forEach(button => {
      // Add ripple effect on click
      button.addEventListener('click', createRipple);
      
      // Track clicks
      button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        
        if (window.HostaraAnalytics && typeof window.HostaraAnalytics.trackEvent === 'function') {
          window.HostaraAnalytics.trackEvent('hero_cta_click', {
            button: buttonText,
            position: 'hero_page'
          });
        }
      });
    });
  }
  
  function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - rect.left - radius}px`;
    ripple.style.top = `${e.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    // Remove existing ripple
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // ===========================================
  // ACCESSIBILITY ENHANCEMENTS
  // ===========================================
  
  function initAccessibility() {
    // Announce page load to screen readers
    const heroPage = document.querySelector('.hero-page');
    if (heroPage) {
      heroPage.setAttribute('aria-busy', 'false');
    }
    
    // Add keyboard navigation for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta .btn');
    ctaButtons.forEach((button, index) => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && index < ctaButtons.length - 1) {
          e.preventDefault();
          ctaButtons[index + 1].focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
          e.preventDefault();
          ctaButtons[index - 1].focus();
        }
      });
    });
  }
  
  // ===========================================
  // PUBLIC API
  // ===========================================
  
  const HostaraHero = {
    init,
    animateCounters,
    CONFIG,
    isInitialized: () => animationsInitialized
  };
  
  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      initCTAEnhancements();
      initAccessibility();
      logPerformanceMetrics();
    });
  } else {
    init();
    initCTAEnhancements();
    initAccessibility();
    logPerformanceMetrics();
  }
  
  // Export to global scope
  window.HostaraHero = HostaraHero;
  
})();
