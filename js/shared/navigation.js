/**
 * NAVIGATION SYSTEM
 * Handles mobile menu, sticky header, smooth scroll, and active link highlighting
 * Based on WEBSITE_DESIGN_SPEC.md
 */

(function() {
  'use strict';

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  
  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.navbar-mobile');
    const mobileLinks = document.querySelectorAll('.navbar-mobile-link');
    
    if (!menuToggle || !mobileMenu) return;
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      
      // Update ARIA attributes
      const isExpanded = menuToggle.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      mobileMenu.setAttribute('aria-hidden', !isExpanded);
    });
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        if (mobileMenu.classList.contains('active')) {
          menuToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
          menuToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
        }
      }
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  };
  
  // ========================================
  // STICKY HEADER ON SCROLL
  // ========================================
  
  const initStickyHeader = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Add 'scrolled' class after scrolling 50px
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };
    
    // Use requestAnimationFrame for better performance
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
  };
  
  // ========================================
  // SMOOTH SCROLL TO ANCHORS
  // ========================================
  
  const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Ignore empty hashes or just '#'
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        // Calculate offset for fixed navbar
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 72;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        // Smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
        
        // Focus the target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      });
    });
  };
  
  // ========================================
  // ACTIVE LINK HIGHLIGHTING
  // ========================================
  
  const initActiveLinks = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link, .navbar-mobile-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let ticking = false;
    
    const updateActiveLink = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href && href.includes(`#${currentSection}`)) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveLink);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial update
    updateActiveLink();
  };
  
  // ========================================
  // NAVIGATION KEYBOARD ACCESSIBILITY
  // ========================================
  
  const initKeyboardNav = () => {
    const navLinks = document.querySelectorAll('.navbar-menu .navbar-link');
    
    if (navLinks.length === 0) return;
    
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        // Arrow key navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextLink = navLinks[index + 1] || navLinks[0];
          nextLink.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
          prevLink.focus();
        }
      });
    });
  };
  
  // ========================================
  // HIGHLIGHT CURRENT PAGE IN NAVIGATION
  // ========================================
  
  const highlightCurrentPage = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-link, .navbar-mobile-link');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      if (linkPath === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  };
  
  // ========================================
  // INITIALIZE ALL NAVIGATION FEATURES
  // ========================================
  
  const init = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initMobileMenu();
        initStickyHeader();
        initSmoothScroll();
        initActiveLinks();
        initKeyboardNav();
        highlightCurrentPage();
      });
    } else {
      initMobileMenu();
      initStickyHeader();
      initSmoothScroll();
      initActiveLinks();
      initKeyboardNav();
      highlightCurrentPage();
    }
  };
  
  // Initialize
  init();
  
  // Export for potential external use
  window.HostaraNav = {
    init
  };
  
})();
