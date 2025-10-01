/**
 * ANALYTICS & TRACKING
 * Event tracking, page views, and user interaction monitoring
 * Based on WEBSITE_DESIGN_SPEC.md
 */

(function() {
  'use strict';

  // ========================================
  // CONFIGURATION
  // ========================================
  
  const config = {
    // Set to true to enable console logging for debugging
    debug: false,
    
    // Google Analytics 4 Measurement ID (to be added before launch)
    ga4MeasurementId: '', // e.g., 'G-XXXXXXXXXX'
    
    // Facebook Pixel ID (optional)
    fbPixelId: '',
    
    // Enable different tracking features
    trackPageViews: true,
    trackClicks: true,
    trackFormSubmissions: true,
    trackScrollDepth: true,
    trackTimeOnPage: true
  };
  
  // ========================================
  // LOGGING UTILITY
  // ========================================
  
  const log = (event, data) => {
    if (config.debug) {
      console.log(`[Analytics] ${event}:`, data);
    }
  };
  
  // ========================================
  // GOOGLE ANALYTICS 4 INTEGRATION
  // ========================================
  
  const initGA4 = () => {
    if (!config.ga4MeasurementId) {
      log('GA4 not initialized', 'No measurement ID provided');
      return;
    }
    
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4MeasurementId}`;
    document.head.appendChild(script);
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', config.ga4MeasurementId);
    
    window.gtag = gtag;
    
    log('GA4 initialized', config.ga4MeasurementId);
  };
  
  // ========================================
  // EVENT TRACKING
  // ========================================
  
  const trackEvent = (eventName, eventParams = {}) => {
    log('Event tracked', { eventName, eventParams });
    
    // Google Analytics 4
    if (window.gtag && config.ga4MeasurementId) {
      window.gtag('event', eventName, eventParams);
    }
    
    // Facebook Pixel
    if (window.fbq && config.fbPixelId) {
      window.fbq('trackCustom', eventName, eventParams);
    }
    
    // Custom analytics endpoint (for future implementation)
    // You can send events to your own backend here
    sendToCustomEndpoint(eventName, eventParams);
  };
  
  const sendToCustomEndpoint = (eventName, eventParams) => {
    // Placeholder for custom analytics endpoint
    // Example: Send to Hostara's own analytics service
    /*
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        params: eventParams,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      })
    }).catch(err => console.error('Analytics error:', err));
    */
  };
  
  // ========================================
  // PAGE VIEW TRACKING
  // ========================================
  
  const trackPageView = (pagePath = window.location.pathname) => {
    if (!config.trackPageViews) return;
    
    trackEvent('page_view', {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href
    });
    
    log('Page view tracked', pagePath);
  };
  
  // ========================================
  // BUTTON & LINK CLICK TRACKING
  // ========================================
  
  const initClickTracking = () => {
    if (!config.trackClicks) return;
    
    // Track CTA button clicks
    document.querySelectorAll('.btn[data-track]').forEach(button => {
      button.addEventListener('click', () => {
        const label = button.getAttribute('data-track') || button.textContent.trim();
        
        trackEvent('cta_click', {
          cta_label: label,
          cta_location: button.closest('section')?.id || 'unknown',
          cta_url: button.href || ''
        });
      });
    });
    
    // Track navigation link clicks
    document.querySelectorAll('.navbar-link, .navbar-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('navigation_click', {
          link_text: link.textContent.trim(),
          link_url: link.href
        });
      });
    });
    
    // Track external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.addEventListener('click', () => {
          trackEvent('outbound_link', {
            link_url: link.href,
            link_text: link.textContent.trim()
          });
        });
      }
    });
    
    // Track business tier card clicks
    document.querySelectorAll('.card-tier .btn').forEach(button => {
      button.addEventListener('click', () => {
        const tierCard = button.closest('.card-tier');
        const tierName = tierCard?.querySelector('h3')?.textContent.trim() || 'Unknown';
        
        trackEvent('tier_selection', {
          tier_name: tierName,
          tier_type: tierCard?.classList.contains('featured') ? 'featured' : 'standard'
        });
      });
    });
    
    // Track app store download buttons
    document.querySelectorAll('[data-track="app-store"], [data-track="google-play"]').forEach(button => {
      button.addEventListener('click', () => {
        trackEvent('app_download_click', {
          platform: button.getAttribute('data-track'),
          location: button.closest('section')?.id || 'unknown'
        });
      });
    });
    
    log('Click tracking initialized', 'All tracked elements monitored');
  };
  
  // ========================================
  // FORM SUBMISSION TRACKING
  // ========================================
  
  const initFormTracking = () => {
    if (!config.trackFormSubmissions) return;
    
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        const formName = form.getAttribute('name') || form.getAttribute('id') || 'unnamed_form';
        
        trackEvent('form_submit', {
          form_name: formName,
          form_location: form.closest('section')?.id || 'unknown'
        });
      });
    });
    
    // Track form field interactions
    document.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(field => {
      let interacted = false;
      
      field.addEventListener('focus', () => {
        if (!interacted) {
          const fieldName = field.getAttribute('name') || field.getAttribute('id') || 'unnamed_field';
          const formName = field.closest('form')?.getAttribute('name') || 'unknown_form';
          
          trackEvent('form_field_interaction', {
            form_name: formName,
            field_name: fieldName,
            field_type: field.type || field.tagName.toLowerCase()
          });
          
          interacted = true;
        }
      });
    });
    
    log('Form tracking initialized', 'All forms monitored');
  };
  
  // ========================================
  // SCROLL DEPTH TRACKING
  // ========================================
  
  const initScrollDepthTracking = () => {
    if (!config.trackScrollDepth) return;
    
    const thresholds = [25, 50, 75, 100];
    const reached = new Set();
    
    let ticking = false;
    
    const checkScrollDepth = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      thresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          
          trackEvent('scroll_depth', {
            depth_percentage: threshold,
            page_path: window.location.pathname
          });
        }
      });
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScrollDepth);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    log('Scroll depth tracking initialized', thresholds);
  };
  
  // ========================================
  // TIME ON PAGE TRACKING
  // ========================================
  
  const initTimeOnPageTracking = () => {
    if (!config.trackTimeOnPage) return;
    
    const startTime = Date.now();
    let isActive = true;
    
    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      isActive = !document.hidden;
    });
    
    // Send time on page before leaving
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
      
      trackEvent('time_on_page', {
        time_seconds: timeSpent,
        page_path: window.location.pathname,
        was_active: isActive
      });
    });
    
    log('Time on page tracking initialized', 'Monitoring user engagement');
  };
  
  // ========================================
  // VIDEO/MEDIA TRACKING
  // ========================================
  
  const initMediaTracking = () => {
    const videos = document.querySelectorAll('video[data-track]');
    
    videos.forEach(video => {
      let tracked = {
        play: false,
        25: false,
        50: false,
        75: false,
        complete: false
      };
      
      video.addEventListener('play', () => {
        if (!tracked.play) {
          trackEvent('video_play', {
            video_title: video.getAttribute('data-track') || 'Unknown',
            video_url: video.src
          });
          tracked.play = true;
        }
      });
      
      video.addEventListener('timeupdate', () => {
        const percentage = Math.round((video.currentTime / video.duration) * 100);
        
        [25, 50, 75].forEach(threshold => {
          if (percentage >= threshold && !tracked[threshold]) {
            trackEvent('video_progress', {
              video_title: video.getAttribute('data-track') || 'Unknown',
              progress_percentage: threshold
            });
            tracked[threshold] = true;
          }
        });
      });
      
      video.addEventListener('ended', () => {
        if (!tracked.complete) {
          trackEvent('video_complete', {
            video_title: video.getAttribute('data-track') || 'Unknown',
            video_url: video.src
          });
          tracked.complete = true;
        }
      });
    });
    
    if (videos.length > 0) {
      log('Media tracking initialized', `${videos.length} videos monitored`);
    }
  };
  
  // ========================================
  // USER SESSION TRACKING
  // ========================================
  
  const initSessionTracking = () => {
    // Check if it's a new session
    const sessionKey = 'hostara_session';
    const isNewSession = !sessionStorage.getItem(sessionKey);
    
    if (isNewSession) {
      sessionStorage.setItem(sessionKey, Date.now());
      
      trackEvent('session_start', {
        referrer: document.referrer,
        landing_page: window.location.pathname
      });
      
      log('New session started', 'User tracked');
    }
  };
  
  // ========================================
  // INITIALIZE ALL ANALYTICS
  // ========================================
  
  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initGA4();
        trackPageView();
        initClickTracking();
        initFormTracking();
        initScrollDepthTracking();
        initTimeOnPageTracking();
        initMediaTracking();
        initSessionTracking();
        
        log('Analytics initialized', 'All tracking features active');
      });
    } else {
      initGA4();
      trackPageView();
      initClickTracking();
      initFormTracking();
      initScrollDepthTracking();
      initTimeOnPageTracking();
      initMediaTracking();
      initSessionTracking();
      
      log('Analytics initialized', 'All tracking features active');
    }
  };
  
  // Initialize
  init();
  
  // Export for external use
  window.HostaraAnalytics = {
    init,
    trackEvent,
    trackPageView,
    config
  };
  
})();
