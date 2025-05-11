/**
 * HostNova Sections - Business section functionality
 * Specific functionality for the business section
 */

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
 * Initialize pricing section with animated features and toggle functionality
 */
function initializePricingSection() {
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const annualPrices = document.querySelectorAll('.price-annual');
    const toggleMonthly = document.getElementById('toggleMonthly');
    const toggleAnnual = document.getElementById('toggleAnnual');
    const savingsBadges = document.querySelectorAll('.annual-savings');
    
    // Initialize with monthly pricing by default
    let isAnnual = false;
    
    // Set initial state
    updatePricingDisplay();
    
    // Toggle between monthly and annual billing
    if (billingToggle) {
        billingToggle.addEventListener('click', function() {
            isAnnual = !isAnnual;
            billingToggle.classList.toggle('active', isAnnual);
            updatePricingDisplay();
            
            // Track pricing toggle event
            if (window.gtag) {
                window.gtag('event', 'toggle_pricing', {
                    'event_category': 'pricing',
                    'event_label': isAnnual ? 'annual' : 'monthly'
                });
            }
        });
    }
    
    // Update pricing display based on toggle state
    function updatePricingDisplay() {
        // Update toggle buttons
        if (toggleMonthly) toggleMonthly.classList.toggle('active', !isAnnual);
        if (toggleAnnual) toggleAnnual.classList.toggle('active', isAnnual);
        
        // Handle price animations
        monthlyPrices.forEach(price => {
            price.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            price.style.opacity = isAnnual ? '0' : '1';
            price.style.transform = isAnnual ? 'translateY(-10px)' : 'translateY(0)';
            price.style.visibility = isAnnual ? 'hidden' : 'visible';
        });
        
        annualPrices.forEach(price => {
            price.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            price.style.opacity = isAnnual ? '1' : '0';
            price.style.transform = isAnnual ? 'translateY(0)' : 'translateY(10px)';
            price.style.visibility = isAnnual ? 'visible' : 'hidden';
        });
        
        // Toggle savings badges visibility
        savingsBadges.forEach(badge => {
            badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            badge.style.opacity = isAnnual ? '1' : '0';
            badge.style.transform = isAnnual ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)';
        });
    }
    
    // Add animations to feature lists for each plan
    const pricingPlans = document.querySelectorAll('.pricing-plan');
    pricingPlans.forEach(plan => {
        const features = plan.querySelectorAll('.feature-item');
        
        features.forEach((feature, index) => {
            // Set initial state
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(10px)';
            
            // Animate features with staggered delay
            setTimeout(() => {
                feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }, 100 + (index * 100)); // Staggered animation
        });
    });
    
    // Initialize FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial state
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.transition = 'max-height 0.5s ease, opacity 0.5s ease, padding 0.5s ease';
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        otherItem.classList.remove('active');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.opacity = '0';
                            otherAnswer.style.padding = '0 1rem';
                        }
                    }
                });
                
                // Toggle current FAQ item
                const isActive = item.classList.toggle('active');
                
                if (isActive) {
                    answer.style.maxHeight = answer.scrollHeight + 30 + 'px'; // Add padding
                    answer.style.opacity = '1';
                    answer.style.padding = '1rem';
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    answer.style.padding = '0 1rem';
                }
            });
        }
    });
}

/**
 * Handle pricing plan selection animations
 */
function setupPricingPlanSelections() {
  const planButtons = document.querySelectorAll('.plan-cta');
  const pricingPlans = document.querySelectorAll('.pricing-plan');
  
  planButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Clear previous selections
      pricingPlans.forEach(plan => plan.classList.remove('selected'));
      
      // Add selected class to parent plan
      const parentPlan = this.closest('.pricing-plan');
      if (parentPlan) {
        parentPlan.classList.add('selected');
        
        // Create success pulse animation
        const successPulse = document.createElement('div');
        successPulse.classList.add('success-pulse');
        parentPlan.appendChild(successPulse);
        
        // Remove after animation completes
        setTimeout(() => {
          successPulse.remove();
        }, 800);
        
        // Track the selection
        const planName = parentPlan.querySelector('.plan-name')?.textContent || 'Unknown Plan';
        if (window.gtag) {
          window.gtag('event', 'select_pricing_plan', {
            'event_category': 'pricing',
            'event_label': planName
          });
        }
        
        // Simulate redirect or further action
        setTimeout(() => {
          // In real implementation, this would redirect to registration/checkout
          console.log(`Selected plan: ${planName}`);
          // window.location.href = `/checkout?plan=${encodeURIComponent(planName)}`;
        }, 1000);
      }
    });
  });
}

/**
 * Track pricing section interactions with analytics
 */
function trackPricingInteractions() {
    // Track plan views
    const pricingPlans = document.querySelectorAll('.pricing-plan');
    pricingPlans.forEach(plan => {
        const planName = plan.querySelector('.plan-name')?.textContent || 'Unknown Plan';
        
        // Create intersection observer to track when plans become visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.gtag) {
                    // Track when a plan is viewed
                    window.gtag('event', 'view_plan', {
                        'event_category': 'pricing',
                        'event_label': planName,
                        'non_interaction': true
                    });
                    
                    // Disconnect after tracking once
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(plan);
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.pricing-plan .plan-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.pricing-plan');
            const planName = plan?.querySelector('.plan-name')?.textContent || 'Unknown Plan';
            
            if (window.gtag) {
                window.gtag('event', 'click_plan_cta', {
                    'event_category': 'pricing',
                    'event_label': planName
                });
            }
        });
    });
    
    // Track FAQ interactions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const questionText = this.textContent || 'Unknown Question';
                
                if (window.gtag) {
                    window.gtag('event', 'expand_faq', {
                        'event_category': 'pricing',
                        'event_label': questionText.trim()
                    });
                }
            });
        }
    });
}

// Add tracking to pricing section initialization
const originalInitPricingSection = window.initializePricingSection;
window.initializePricingSection = function() {
    if (originalInitPricingSection) {
        originalInitPricingSection();
    }
    
    // Add tracking after initialization
    trackPricingInteractions();
};

// Add to pricing section initialization
const previousInitPricingSection = window.initializePricingSection;
window.initializePricingSection = function() {
  if (previousInitPricingSection) {
    previousInitPricingSection();
  }
  
  // Setup plan selection animations
  setupPricingPlanSelections();
};

// Add initialization when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePricingSection();
});

// Make it available globally
window.initializePricingSection = initializePricingSection;
